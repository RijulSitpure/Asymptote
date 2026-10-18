import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..');

// 1. Database Generators & Files
const DB_TESTS = {
  'rank-scores': {
    meta: { runner: 'database', ordered: true, testKind: 'deterministic' },
    schema: 'CREATE TABLE Scores (id int, score decimal(3,2));',
    reference: `SELECT s.score,
       (SELECT COUNT(DISTINCT s2.score) FROM Scores s2 WHERE s2.score >= s.score) AS \`rank\`
FROM Scores s
ORDER BY s.score DESC;`,
    generator: `import json, random

cases = [
    {
        'name': 'standard_example',
        'inserts': "INSERT INTO Scores VALUES (1, 3.50), (2, 3.65), (3, 4.00), (4, 3.85), (5, 4.00), (6, 3.65);"
    },
    {
        'name': 'empty_table',
        'inserts': ""
    },
    {
        'name': 'single_score',
        'inserts': "INSERT INTO Scores VALUES (1, 3.14);"
    },
    {
        'name': 'all_identical_scores',
        'inserts': "INSERT INTO Scores VALUES (1, 5.00), (2, 5.00), (3, 5.00), (4, 5.00);"
    },
    {
        'name': 'strictly_descending',
        'inserts': "INSERT INTO Scores VALUES (1, 10.00), (2, 9.00), (3, 8.00), (4, 7.00);"
    }
]

random.seed(42)
for i in range(20):
    cnt = random.randint(2, 25)
    vals = [f"({j+1}, {random.randint(10, 99) / 10.0:.2f})" for j in range(cnt)]
    cases.append({
        'name': f'random_case_{i+1}',
        'inserts': f"INSERT INTO Scores VALUES {', '.join(vals)};"
    })

# Scale case: 2,000 rows in 4 batches of 500
scale_inserts = []
for b in range(4):
    batch = [f"({b * 500 + j + 1}, {random.randint(10, 99) / 10.0:.2f})" for j in range(500)]
    scale_inserts.append(f"INSERT INTO Scores VALUES {', '.join(batch)};")

cases.append({
    'name': 'scale_case_2000_rows',
    'inserts': '\\n'.join(scale_inserts)
})

print(json.dumps(cases))
`
  },

  'consecutive-numbers': {
    meta: { runner: 'database', ordered: false, testKind: 'deterministic' },
    schema: 'CREATE TABLE Logs (id int, num int);',
    reference: `SELECT DISTINCT l1.num AS ConsecutiveNums
FROM Logs l1
JOIN Logs l2 ON l1.id = l2.id - 1
JOIN Logs l3 ON l1.id = l3.id - 2
WHERE l1.num = l2.num AND l2.num = l3.num;`,
    generator: `import json, random

cases = [
    {
        'name': 'standard_example',
        'inserts': "INSERT INTO Logs VALUES (1, 1), (2, 1), (3, 1), (4, 2), (5, 1), (6, 2), (7, 2);"
    },
    {
        'name': 'empty_table',
        'inserts': ""
    },
    {
        'name': 'no_consecutive',
        'inserts': "INSERT INTO Logs VALUES (1, 1), (2, 2), (3, 1), (4, 2), (5, 3);"
    },
    {
        'name': 'multiple_consecutive_numbers',
        'inserts': "INSERT INTO Logs VALUES (1, 3), (2, 3), (3, 3), (4, 5), (5, 5), (6, 5);"
    },
    {
        'name': 'gap_in_ids_not_consecutive',
        'inserts': "INSERT INTO Logs VALUES (1, 1), (2, 1), (4, 1);"
    }
]

random.seed(42)
for i in range(20):
    cnt = random.randint(3, 30)
    # create occasional 3-streaks
    nums = []
    curr = random.randint(1, 5)
    for _ in range(cnt):
        if random.random() < 0.4:
            nums.append(curr)
        else:
            curr = random.randint(1, 5)
            nums.append(curr)
    vals = [f"({j+1}, {nums[j]})" for j in range(cnt)]
    cases.append({
        'name': f'random_case_{i+1}',
        'inserts': f"INSERT INTO Logs VALUES {', '.join(vals)};"
    })

# Scale case: 2,000 rows in 4 batches of 500
scale_inserts = []
for b in range(4):
    batch = [f"({b * 500 + j + 1}, {random.randint(1, 8)})" for j in range(500)]
    scale_inserts.append(f"INSERT INTO Logs VALUES {', '.join(batch)};")

cases.append({
    'name': 'scale_case_2000_rows',
    'inserts': '\\n'.join(scale_inserts)
})

print(json.dumps(cases))
`
  },

  'employees-earning-more-than-their-managers': {
    meta: { runner: 'database', ordered: false, testKind: 'deterministic' },
    schema: 'CREATE TABLE Employee (id int, name varchar(50), salary int, managerId int);',
    reference: `SELECT e.name AS Employee
FROM Employee e
WHERE e.managerId IS NOT NULL
  AND e.salary > (SELECT m.salary FROM Employee m WHERE m.id = e.managerId);`,
    generator: `import json, random

cases = [
    {
        'name': 'standard_example',
        'inserts': "INSERT INTO Employee VALUES (1, 'Joe', 70000, 3), (2, 'Henry', 80000, 4), (3, 'Sam', 60000, NULL), (4, 'Max', 90000, NULL);"
    },
    {
        'name': 'empty_table',
        'inserts': ""
    },
    {
        'name': 'no_one_earns_more',
        'inserts': "INSERT INTO Employee VALUES (1, 'Boss', 100000, NULL), (2, 'Worker', 50000, 1);"
    },
    {
        'name': 'equal_salary_does_not_count',
        'inserts': "INSERT INTO Employee VALUES (1, 'Boss', 80000, NULL), (2, 'Peer', 80000, 1);"
    }
]

names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Hannah', 'Ian', 'Jack']
random.seed(42)
for i in range(20):
    cnt = random.randint(2, 25)
    rows = []
    for j in range(cnt):
        eid = j + 1
        name = random.choice(names)
        sal = random.randint(30, 150) * 1000
        mgr = "NULL" if eid == 1 or random.random() < 0.2 else str(random.randint(1, max(1, eid - 1)))
        rows.append(f"({eid}, '{name}', {sal}, {mgr})")
    cases.append({
        'name': f'random_case_{i+1}',
        'inserts': f"INSERT INTO Employee VALUES {', '.join(rows)};"
    })

# Scale case: 2,000 rows
scale_inserts = []
for b in range(4):
    batch = []
    for j in range(500):
        eid = b * 500 + j + 1
        name = random.choice(names)
        sal = random.randint(30, 200) * 1000
        mgr = "NULL" if eid <= 5 or random.random() < 0.1 else str(random.randint(1, min(eid - 1, 50)))
        batch.append(f"({eid}, '{name}', {sal}, {mgr})")
    scale_inserts.append(f"INSERT INTO Employee VALUES {', '.join(batch)};")

cases.append({
    'name': 'scale_case_2000_rows',
    'inserts': '\\n'.join(scale_inserts)
})

print(json.dumps(cases))
`
  },

  'duplicate-emails': {
    meta: { runner: 'database', ordered: false, testKind: 'deterministic' },
    schema: 'CREATE TABLE Person (id int, email varchar(50));',
    reference: `SELECT DISTINCT p1.email AS Email
FROM Person p1
WHERE EXISTS (
    SELECT 1 FROM Person p2 WHERE p2.email = p1.email AND p2.id <> p1.id
);`,
    generator: `import json, random

cases = [
    {
        'name': 'standard_example',
        'inserts': "INSERT INTO Person VALUES (1, 'a@b.com'), (2, 'c@d.com'), (3, 'a@b.com');"
    },
    {
        'name': 'empty_table',
        'inserts': ""
    },
    {
        'name': 'all_unique',
        'inserts': "INSERT INTO Person VALUES (1, 'u1@x.com'), (2, 'u2@x.com'), (3, 'u3@x.com');"
    },
    {
        'name': 'multiple_duplicates_same_email',
        'inserts': "INSERT INTO Person VALUES (1, 'x@y.com'), (2, 'x@y.com'), (3, 'x@y.com'), (4, 'x@y.com');"
    }
]

emails_pool = ['a@x.com', 'b@x.com', 'c@x.com', 'd@x.com', 'e@x.com', 'f@x.com']
random.seed(42)
for i in range(20):
    cnt = random.randint(2, 30)
    rows = [f"({j+1}, '{random.choice(emails_pool)}')" for j in range(cnt)]
    cases.append({
        'name': f'random_case_{i+1}',
        'inserts': f"INSERT INTO Person VALUES {', '.join(rows)};"
    })

# Scale case: 2,000 rows
scale_inserts = []
for b in range(4):
    batch = [f"({b * 500 + j + 1}, '{random.choice(emails_pool)}')" for j in range(500)]
    scale_inserts.append(f"INSERT INTO Person VALUES {', '.join(batch)};")

cases.append({
    'name': 'scale_case_2000_rows',
    'inserts': '\\n'.join(scale_inserts)
})

print(json.dumps(cases))
`
  },

  'customers-who-never-order': {
    meta: { runner: 'database', ordered: false, testKind: 'deterministic' },
    schema: `CREATE TABLE Customers (id int, name varchar(50));
CREATE TABLE Orders (id int, customerId int);`,
    reference: `SELECT c.name AS Customers
FROM Customers c
WHERE NOT EXISTS (
    SELECT 1 FROM Orders o WHERE o.customerId = c.id
);`,
    generator: `import json, random

cases = [
    {
        'name': 'standard_example',
        'inserts': """INSERT INTO Customers VALUES (1, 'Joe'), (2, 'Henry'), (3, 'Sam'), (4, 'Max');
INSERT INTO Orders VALUES (1, 3), (2, 1);"""
    },
    {
        'name': 'empty_tables',
        'inserts': ""
    },
    {
        'name': 'all_customers_ordered',
        'inserts': """INSERT INTO Customers VALUES (1, 'Alice'), (2, 'Bob');
INSERT INTO Orders VALUES (1, 1), (2, 2);"""
    },
    {
        'name': 'no_customers_ordered',
        'inserts': """INSERT INTO Customers VALUES (1, 'Alice'), (2, 'Bob');
INSERT INTO Orders VALUES (1, 999);"""
    }
]

names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Helen']
random.seed(42)
for i in range(20):
    c_count = random.randint(1, 20)
    c_rows = [f"({cid}, '{random.choice(names)}')" for cid in range(1, c_count + 1)]
    o_count = random.randint(0, c_count * 2)
    o_rows = [f"({oid}, {random.randint(1, c_count + 2)})" for oid in range(1, o_count + 1)]
    
    ins = f"INSERT INTO Customers VALUES {', '.join(c_rows)};"
    if o_rows:
        ins += f"\\nINSERT INTO Orders VALUES {', '.join(o_rows)};"
    cases.append({
        'name': f'random_case_{i+1}',
        'inserts': ins
    })

# Scale case: 2,000 Customers + 2,000 Orders in 4 batches of 500
scale_inserts = []
for b in range(4):
    c_batch = [f"({b * 500 + j + 1}, '{random.choice(names)}')" for j in range(500)]
    scale_inserts.append(f"INSERT INTO Customers VALUES {', '.join(c_batch)};")
for b in range(4):
    # order from only first 1,000 customers so 1001-2000 have no orders
    o_batch = [f"({b * 500 + j + 1}, {random.randint(1, 1000)})" for j in range(500)]
    scale_inserts.append(f"INSERT INTO Orders VALUES {', '.join(o_batch)};")

cases.append({
    'name': 'scale_case_2000_rows',
    'inserts': '\\n'.join(scale_inserts)
})

print(json.dumps(cases))
`
  },

  'department-top-three-salaries': {
    meta: { runner: 'database', ordered: false, testKind: 'deterministic' },
    schema: `CREATE TABLE Employee (id int, name varchar(50), salary int, departmentId int);
CREATE TABLE Department (id int, name varchar(50));`,
    reference: `SELECT d.name AS Department, e1.name AS Employee, e1.salary AS Salary
FROM Employee e1
JOIN Department d ON e1.departmentId = d.id
WHERE 3 > (
    SELECT COUNT(DISTINCT e2.salary)
    FROM Employee e2
    WHERE e2.salary > e1.salary AND e2.departmentId = e1.departmentId
);`,
    generator: `import json, random

cases = [
    {
        'name': 'standard_example_with_ties',
        'inserts': """INSERT INTO Department VALUES (1, 'IT'), (2, 'Sales');
INSERT INTO Employee VALUES (1, 'Joe', 85000, 1), (2, 'Henry', 80000, 2), (3, 'Sam', 60000, 2), (4, 'Max', 90000, 1), (5, 'Janet', 69000, 1), (6, 'Randy', 85000, 1), (7, 'Will', 70000, 1);"""
    },
    {
        'name': 'empty_tables',
        'inserts': ""
    },
    {
        'name': 'department_with_fewer_than_three_employees',
        'inserts': """INSERT INTO Department VALUES (1, 'HR');
INSERT INTO Employee VALUES (1, 'Alice', 50000, 1), (2, 'Bob', 60000, 1);"""
    }
]

emp_names = ['Joe', 'Henry', 'Sam', 'Max', 'Janet', 'Randy', 'Will', 'Sarah', 'Karen', 'Tom']
dept_names = ['IT', 'Sales', 'Finance', 'Engineering', 'Marketing']

random.seed(42)
for i in range(20):
    d_count = random.randint(1, 4)
    d_rows = [f"({did}, '{dept_names[did-1]}')" for did in range(1, d_count + 1)]
    e_count = random.randint(2, 30)
    e_rows = [f"({eid}, '{random.choice(emp_names)}', {random.randint(40, 120) * 1000}, {random.randint(1, d_count)})" for eid in range(1, e_count + 1)]
    
    ins = f"INSERT INTO Department VALUES {', '.join(d_rows)};\\nINSERT INTO Employee VALUES {', '.join(e_rows)};"
    cases.append({
        'name': f'random_case_{i+1}',
        'inserts': ins
    })

# Scale case: 2,000 employees across 5 departments
scale_inserts = [
    "INSERT INTO Department VALUES (1, 'IT'), (2, 'Sales'), (3, 'Finance'), (4, 'Engineering'), (5, 'Marketing');"
]
for b in range(4):
    batch = [f"({b * 500 + j + 1}, '{random.choice(emp_names)}', {random.randint(40, 120) * 1000}, {random.randint(1, 5)})" for j in range(500)]
    scale_inserts.append(f"INSERT INTO Employee VALUES {', '.join(batch)};")

cases.append({
    'name': 'scale_case_2000_rows',
    'inserts': '\\n'.join(scale_inserts)
})

print(json.dumps(cases))
`
  },

  'managers-with-at-least-5-direct-reports': {
    meta: { runner: 'database', ordered: false, testKind: 'deterministic' },
    schema: 'CREATE TABLE Employee (id int, name varchar(50), department varchar(50), managerId int);',
    reference: `SELECT name
FROM Employee
WHERE id IN (
    SELECT managerId
    FROM Employee
    GROUP BY managerId
    HAVING COUNT(*) >= 5
);`,
    generator: `import json, random

cases = [
    {
        'name': 'standard_example',
        'inserts': """INSERT INTO Employee VALUES 
(101, 'John', 'A', NULL),
(102, 'Dan', 'A', 101),
(103, 'James', 'A', 101),
(104, 'Amy', 'A', 101),
(105, 'Anne', 'A', 101),
(106, 'Ron', 'B', 101);"""
    },
    {
        'name': 'empty_table',
        'inserts': ""
    },
    {
        'name': 'exactly_four_reports_fails_threshold',
        'inserts': """INSERT INTO Employee VALUES 
(1, 'Boss', 'X', NULL),
(2, 'E1', 'X', 1),
(3, 'E2', 'X', 1),
(4, 'E3', 'X', 1),
(5, 'E4', 'X', 1);"""
    },
    {
        'name': 'multiple_qualifying_managers',
        'inserts': """INSERT INTO Employee VALUES 
(1, 'M1', 'X', NULL), (2, 'M2', 'Y', NULL),
(11, 'E1', 'X', 1), (12, 'E2', 'X', 1), (13, 'E3', 'X', 1), (14, 'E4', 'X', 1), (15, 'E5', 'X', 1),
(21, 'F1', 'Y', 2), (22, 'F2', 'Y', 2), (23, 'F3', 'Y', 2), (24, 'F4', 'Y', 2), (25, 'F5', 'Y', 2), (26, 'F6', 'Y', 2);"""
    }
]

names = ['John', 'Dan', 'James', 'Amy', 'Anne', 'Ron', 'Alice', 'Bob', 'Charlie']
random.seed(42)
for i in range(20):
    cnt = random.randint(5, 30)
    mgr_ids = [1, 2]
    rows = []
    for j in range(cnt):
        eid = j + 1
        name = random.choice(names)
        mgr = "NULL" if eid in mgr_ids else str(random.choice(mgr_ids))
        rows.append(f"({eid}, '{name}', 'Dept', {mgr})")
    cases.append({
        'name': f'random_case_{i+1}',
        'inserts': f"INSERT INTO Employee VALUES {', '.join(rows)};"
    })

# Scale case: 2,000 employees
scale_inserts = []
for b in range(4):
    batch = []
    for j in range(500):
        eid = b * 500 + j + 1
        name = random.choice(names)
        mgr = "NULL" if eid <= 10 else str(random.randint(1, 10))
        batch.append(f"({eid}, '{name}', 'Dept', {mgr})")
    scale_inserts.append(f"INSERT INTO Employee VALUES {', '.join(batch)};")

cases.append({
    'name': 'scale_case_2000_rows',
    'inserts': '\\n'.join(scale_inserts)
})

print(json.dumps(cases))
`
  },

  'classes-more-than-5-students': {
    meta: { runner: 'database', ordered: false, testKind: 'deterministic' },
    schema: 'CREATE TABLE Courses (student varchar(50), class varchar(50));',
    reference: `SELECT DISTINCT c1.class
FROM Courses c1
WHERE (
    SELECT COUNT(c2.student)
    FROM Courses c2
    WHERE c2.class = c1.class
) >= 5;`,
    generator: `import json, random

cases = [
    {
        'name': 'standard_example',
        'inserts': """INSERT INTO Courses VALUES 
('A', 'Math'), ('B', 'English'), ('C', 'Math'), ('D', 'Biology'),
('E', 'Math'), ('F', 'Computer'), ('G', 'Math'), ('H', 'Math'), ('I', 'Math');"""
    },
    {
        'name': 'empty_table',
        'inserts': ""
    },
    {
        'name': 'exactly_four_students_fails',
        'inserts': "INSERT INTO Courses VALUES ('A', 'Physics'), ('B', 'Physics'), ('C', 'Physics'), ('D', 'Physics');"
    },
    {
        'name': 'exactly_five_students_qualifies',
        'inserts': "INSERT INTO Courses VALUES ('A', 'Art'), ('B', 'Art'), ('C', 'Art'), ('D', 'Art'), ('E', 'Art');"
    }
]

students = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Henry', 'Iris', 'Jack']
classes = ['Math', 'English', 'Biology', 'Computer', 'History', 'Physics', 'Music']

random.seed(42)
for i in range(20):
    cnt = random.randint(5, 35)
    rows = [f"('{random.choice(students)}_{j}', '{random.choice(classes)}')" for j in range(cnt)]
    cases.append({
        'name': f'random_case_{i+1}',
        'inserts': f"INSERT INTO Courses VALUES {', '.join(rows)};"
    })

# Scale case: 2,000 rows
scale_inserts = []
for b in range(4):
    batch = [f"('Student_{b * 500 + j}', '{random.choice(classes)}')" for j in range(500)]
    scale_inserts.append(f"INSERT INTO Courses VALUES {', '.join(batch)};")

cases.append({
    'name': 'scale_case_2000_rows',
    'inserts': '\\n'.join(scale_inserts)
})

print(json.dumps(cases))
`
  }
};

// 2. pandas Generators & Files
const PANDAS_TESTS = {
  'select-data': {
    meta: { runner: 'pandas', testKind: 'deterministic', randomCases: 25, maxSize: 10000 },
    testPy: `import os, sys, json, time, random
import pandas as pd
from pandas.testing import assert_frame_equal

base = os.path.dirname(os.path.abspath(__file__))
prob_path = os.path.join(base, '..', '..', 'problems', 'select-data.json')
with open(prob_path, 'r', encoding='utf-8') as f:
    prob = json.load(f)

sol_code = prob['solutions'][0]['code']
exec(sol_code, globals())

def ref_select(df):
    return df[df['student_id'] == 101][['name', 'age']].reset_index(drop=True)

# Fixed Cases
f1 = pd.DataFrame({
    'student_id': [101, 102, 103, 104],
    'name': ['Ulysses', 'William', 'Vance', 'Carl'],
    'age': [13, 10, 12, 11]
})
act1 = selectData(f1.copy()).reset_index(drop=True)
exp1 = ref_select(f1)
assert_frame_equal(act1, exp1, check_dtype=True)

f_no_101 = pd.DataFrame({
    'student_id': [102, 103],
    'name': ['Alice', 'Bob'],
    'age': [20, 21]
})
act_none = selectData(f_no_101.copy()).reset_index(drop=True)
exp_none = ref_select(f_no_101)
assert_frame_equal(act_none, exp_none, check_dtype=True)

# Random Cases
random.seed(42)
names = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda']
for _ in range(25):
    sz = random.randint(1, 40)
    has_target = random.choice([True, False])
    ids = list(range(102, 102 + sz))
    if has_target:
        ids[random.randint(0, sz - 1)] = 101
    df = pd.DataFrame({
        'student_id': ids,
        'name': [random.choice(names) for _ in range(sz)],
        'age': [random.randint(10, 25) for _ in range(sz)]
    })
    act = selectData(df.copy()).reset_index(drop=True)
    exp = ref_select(df)
    assert_frame_equal(act, exp, check_dtype=True)

# Scale Benchmark (10,000 rows)
sz = 10000
scale_df = pd.DataFrame({
    'student_id': list(range(200, 200 + sz)),
    'name': [random.choice(names) for _ in range(sz)],
    'age': [random.randint(15, 60) for _ in range(sz)]
})
scale_df.iloc[5000, 0] = 101
t0 = time.perf_counter()
act_scale = selectData(scale_df.copy()).reset_index(drop=True)
t1 = time.perf_counter()
exp_scale = ref_select(scale_df)
assert_frame_equal(act_scale, exp_scale, check_dtype=True)

print(f"Passed 2 fixed, 25 random, and 1 max-size (10,000 rows in {(t1-t0):.4f}s) tests")
`
  },

  'create-a-new-column': {
    meta: { runner: 'pandas', testKind: 'deterministic', randomCases: 25, maxSize: 10000 },
    testPy: `import os, sys, json, time, random
import pandas as pd
from pandas.testing import assert_frame_equal

base = os.path.dirname(os.path.abspath(__file__))
prob_path = os.path.join(base, '..', '..', 'problems', 'create-a-new-column.json')
with open(prob_path, 'r', encoding='utf-8') as f:
    prob = json.load(f)

sol_code = prob['solutions'][0]['code']
exec(sol_code, globals())

def ref_create(df):
    res = df.copy()
    res['bonus'] = res['salary'] * 2
    return res

# Fixed Cases
f1 = pd.DataFrame({
    'name': ['Piper', 'Grace', 'Georgia', 'Willow', 'Finn', 'Thomas'],
    'salary': [4548, 28150, 1103, 6593, 74576, 24433]
})
act1 = createBonusColumn(f1.copy())
exp1 = ref_create(f1)
assert_frame_equal(act1, exp1, check_dtype=True)

f_empty = pd.DataFrame(columns=['name', 'salary'])
f_empty['salary'] = f_empty['salary'].astype(int)
act_empty = createBonusColumn(f_empty.copy())
exp_empty = ref_create(f_empty)
assert_frame_equal(act_empty, exp_empty, check_dtype=True)

# Random Cases
random.seed(42)
names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace']
for _ in range(25):
    sz = random.randint(1, 50)
    df = pd.DataFrame({
        'name': [random.choice(names) for _ in range(sz)],
        'salary': [random.randint(1000, 100000) for _ in range(sz)]
    })
    act = createBonusColumn(df.copy())
    exp = ref_create(df)
    assert_frame_equal(act, exp, check_dtype=True)

# Scale Case: 10,000 rows
sz = 10000
scale_df = pd.DataFrame({
    'name': [random.choice(names) for _ in range(sz)],
    'salary': [random.randint(2000, 200000) for _ in range(sz)]
})
t0 = time.perf_counter()
act_scale = createBonusColumn(scale_df.copy())
t1 = time.perf_counter()
exp_scale = ref_create(scale_df)
assert_frame_equal(act_scale, exp_scale, check_dtype=True)

print(f"Passed 2 fixed, 25 random, and 1 max-size (10,000 rows in {(t1-t0):.4f}s) tests")
`
  },

  'modify-columns': {
    meta: { runner: 'pandas', testKind: 'deterministic', randomCases: 25, maxSize: 10000 },
    testPy: `import os, sys, json, time, random
import pandas as pd
from pandas.testing import assert_frame_equal

base = os.path.dirname(os.path.abspath(__file__))
prob_path = os.path.join(base, '..', '..', 'problems', 'modify-columns.json')
with open(prob_path, 'r', encoding='utf-8') as f:
    prob = json.load(f)

sol_code = prob['solutions'][0]['code']
exec(sol_code, globals())

def ref_modify(df):
    res = df.copy()
    res['salary'] = res['salary'] * 2
    return res

# Fixed Cases
f1 = pd.DataFrame({
    'name': ['Jack', 'Piper', 'Mia', 'Ulysses'],
    'salary': [19666, 74754, 62509, 54866]
})
act1 = modifySalaryColumn(f1.copy())
exp1 = ref_modify(f1)
assert_frame_equal(act1, exp1, check_dtype=True)

# Random Cases
random.seed(42)
names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace']
for _ in range(25):
    sz = random.randint(1, 50)
    df = pd.DataFrame({
        'name': [random.choice(names) for _ in range(sz)],
        'salary': [random.randint(1000, 100000) for _ in range(sz)]
    })
    act = modifySalaryColumn(df.copy())
    exp = ref_modify(df)
    assert_frame_equal(act, exp, check_dtype=True)

# Scale Case: 10,000 rows
sz = 10000
scale_df = pd.DataFrame({
    'name': [random.choice(names) for _ in range(sz)],
    'salary': [random.randint(2000, 200000) for _ in range(sz)]
})
t0 = time.perf_counter()
act_scale = modifySalaryColumn(scale_df.copy())
t1 = time.perf_counter()
exp_scale = ref_modify(scale_df)
assert_frame_equal(act_scale, exp_scale, check_dtype=True)

print(f"Passed 1 fixed, 25 random, and 1 max-size (10,000 rows in {(t1-t0):.4f}s) tests")
`
  },

  'fill-missing-data': {
    meta: { runner: 'pandas', testKind: 'deterministic', randomCases: 25, maxSize: 10000 },
    testPy: `import os, sys, json, time, random
import pandas as pd
import numpy as np
from pandas.testing import assert_frame_equal

base = os.path.dirname(os.path.abspath(__file__))
prob_path = os.path.join(base, '..', '..', 'problems', 'fill-missing-data.json')
with open(prob_path, 'r', encoding='utf-8') as f:
    prob = json.load(f)

sol_code = prob['solutions'][0]['code']
exec(sol_code, globals())

def ref_fill(df):
    res = df.copy()
    res['quantity'] = res['quantity'].fillna(0)
    return res

# Fixed Cases
f1 = pd.DataFrame({
    'name': ['Wristwatch', 'WirelessEarbuds', 'GolfClubs', 'Printer'],
    'quantity': [None, None, 779, 849],
    'price': [135, 821, 9319, 3051]
})
act1 = fillMissingValues(f1.copy())
exp1 = ref_fill(f1)
assert_frame_equal(act1, exp1, check_dtype=True)

# Random Cases
random.seed(42)
prod_names = ['ItemA', 'ItemB', 'ItemC', 'ItemD', 'ItemE']
for _ in range(25):
    sz = random.randint(1, 50)
    qty = [None if random.random() < 0.3 else float(random.randint(1, 500)) for _ in range(sz)]
    df = pd.DataFrame({
        'name': [random.choice(prod_names) for _ in range(sz)],
        'quantity': qty,
        'price': [random.randint(10, 5000) for _ in range(sz)]
    })
    act = fillMissingValues(df.copy())
    exp = ref_fill(df)
    assert_frame_equal(act, exp, check_dtype=True)

# Scale Case: 10,000 rows with 30% missing values
sz = 10000
scale_df = pd.DataFrame({
    'name': [random.choice(prod_names) for _ in range(sz)],
    'quantity': [None if random.random() < 0.3 else float(random.randint(1, 1000)) for _ in range(sz)],
    'price': [random.randint(10, 10000) for _ in range(sz)]
})
t0 = time.perf_counter()
act_scale = fillMissingValues(scale_df.copy())
t1 = time.perf_counter()
exp_scale = ref_fill(scale_df)
assert_frame_equal(act_scale, exp_scale, check_dtype=True)

print(f"Passed 1 fixed, 25 random, and 1 max-size (10,000 rows in {(t1-t0):.4f}s) tests")
`
  }
};

// 3. JavaScript Tests
const JS_TESTS = {
  'function-composition': {
    meta: { runner: 'node', testKind: 'deterministic' },
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/function-composition.json'), 'utf8'));
const solCode = prob.solutions[0].code;

const compose = new Function(solCode + '; return compose;')();

// Test 1: [x => x + 1, x => x * x, x => 2 * x], x = 4 -> 4*2=8 -> 8*8=64 -> 64+1=65
const fn1 = compose([x => x + 1, x => x * x, x => 2 * x]);
assert.equal(fn1(4), 65);

// Test 2: [x => 10 * x, x => 10 * x, x => 10 * x], x = 1 -> 1000
const fn2 = compose([x => 10 * x, x => 10 * x, x => 10 * x]);
assert.equal(fn2(1), 1000);

// Test 3: empty functions array -> identity
const fn3 = compose([]);
assert.equal(fn3(42), 42);
assert.equal(fn3(-10), -10);

// Random cases: 25 random chains
for (let i = 0; i < 25; i++) {
  const funcs = [];
  const len = Math.floor(Math.random() * 8) + 1;
  for (let j = 0; j < len; j++) {
    const op = Math.random();
    if (op < 0.33) funcs.push(x => x + 2);
    else if (op < 0.66) funcs.push(x => x - 3);
    else funcs.push(x => x * 2);
  }
  const composed = compose(funcs);
  const input = Math.floor(Math.random() * 20);
  let expected = input;
  for (let k = funcs.length - 1; k >= 0; k--) {
    expected = funcs[k](expected);
  }
  assert.equal(composed(input), expected, \`Mismatch in random composition \${i}\`);
}

// Scale test: 1,000 chained increments
const largeFns = Array.from({ length: 1000 }, () => (x => x + 1));
const largeComposed = compose(largeFns);
assert.equal(largeComposed(0), 1000);

console.log('Passed all function-composition fixed, random, and scale tests');
`
  },

  'filter-elements-from-array': {
    meta: { runner: 'node', testKind: 'deterministic' },
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/filter-elements-from-array.json'), 'utf8'));
const solCode = prob.solutions[0].code;

const filter = new Function(solCode + '; return filter;')();

// Test 1: fn = function greaterThan10(n) { return n > 10; }
assert.deepEqual(filter([0, 10, 20, 30], n => n > 10), [20, 30]);

// Test 2: fn = function firstIndex(n, i) { return i === 0; }
assert.deepEqual(filter([1, 2, 3], (n, i) => i === 0), [1]);

// Test 3: fn = function plusOne(n) { return n + 1 } (truthy testing: 0+1=1 true, -1+1=0 false)
assert.deepEqual(filter([-2, -1, 0, 1, 2], n => n + 1), [-2, 0, 1, 2]);

// Test 4: empty array
assert.deepEqual(filter([], () => true), []);

// Random cases: 25 cases
for (let i = 0; i < 25; i++) {
  const sz = Math.floor(Math.random() * 40);
  const arr = Array.from({ length: sz }, () => Math.floor(Math.random() * 100) - 50);
  const threshold = Math.floor(Math.random() * 50) - 25;
  const pred = (n, idx) => (idx % 2 === 0 ? n > threshold : Boolean(n));
  
  const actual = filter(arr, pred);
  const expected = [];
  for (let j = 0; j < arr.length; j++) {
    if (pred(arr[j], j)) expected.push(arr[j]);
  }
  assert.deepEqual(actual, expected, \`Mismatch in random test \${i}\`);
}

// Scale test: 10,000 elements
const bigArr = Array.from({ length: 10000 }, (_, i) => i);
const bigFiltered = filter(bigArr, n => n % 2 === 0);
assert.equal(bigFiltered.length, 5000);

console.log('Passed all filter-elements-from-array fixed, truthy, random, and scale tests');
`
  },

  'memoize': {
    meta: { runner: 'node', testKind: 'deterministic' },
    testJs: `import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prob = JSON.parse(fs.readFileSync(path.join(__dirname, '../../problems/memoize.json'), 'utf8'));
const solCode = prob.solutions[0].code;

const memoize = new Function(solCode + '; return memoize;')();

// Test 1: sum function call count tracking
let sumCallCount = 0;
const sum = memoize((a, b) => {
  sumCallCount++;
  return a + b;
});

assert.equal(sum(2, 2), 4);
assert.equal(sumCallCount, 1);
assert.equal(sum(2, 2), 4);
assert.equal(sumCallCount, 1); // cached!

assert.equal(sum(1, 2), 3);
assert.equal(sumCallCount, 2);
assert.equal(sum(1, 2), 3);
assert.equal(sumCallCount, 2); // cached!

// Test 2: factorial function
let factCallCount = 0;
const fact = memoize(n => {
  factCallCount++;
  return n <= 1 ? 1 : n * fact(n - 1);
});

assert.equal(fact(2), 2);
assert.equal(factCallCount, 2); // 2 and 1
assert.equal(fact(3), 6);
assert.equal(factCallCount, 3); // 3 (2 and 1 were already cached)
assert.equal(fact(2), 2);
assert.equal(factCallCount, 3); // completely cached

// Test 3: fib function
let fibCallCount = 0;
const fib = memoize(n => {
  fibCallCount++;
  return n <= 1 ? 1 : fib(n - 1) + fib(n - 2);
});

assert.equal(fib(5), 8);
const currentFibCount = fibCallCount;
assert.equal(fib(5), 8);
assert.equal(fibCallCount, currentFibCount);

// Test 4: Random calls with repeated arguments
let rndCount = 0;
const rndFn = memoize((x, y) => {
  rndCount++;
  return x * 100 + y;
});

const seen = new Set();
for (let i = 0; i < 50; i++) {
  const x = Math.floor(Math.random() * 5);
  const y = Math.floor(Math.random() * 5);
  seen.add(\`\${x},\${y}\`);
  const res = rndFn(x, y);
  assert.equal(res, x * 100 + y);
}
assert.equal(rndCount, seen.size);

// Scale test: 5,000 calls across 50 unique keys
let scaleCallCount = 0;
const scaleFn = memoize(x => {
  scaleCallCount++;
  return x * x;
});

for (let i = 0; i < 5000; i++) {
  const k = i % 50;
  assert.equal(scaleFn(k), k * k);
}
assert.equal(scaleCallCount, 50);

console.log('Passed all memoize call-count caching, factorial, fib, random, and scale tests');
`
  }
};

function main() {
  const testsDir = path.join(rootDir, 'dataset', 'tests');

  // Write Database tests
  for (const [slug, data] of Object.entries(DB_TESTS)) {
    const dir = path.join(testsDir, slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify(data.meta, null, 2) + '\n');
    fs.writeFileSync(path.join(dir, 'schema.sql'), data.schema + '\n');
    fs.writeFileSync(path.join(dir, 'reference.sql'), data.reference + '\n');
    fs.writeFileSync(path.join(dir, 'generator.py'), data.generator, { mode: 0o755 });
    console.log(`✓ Wrote Database test suite for ${slug}`);
  }

  // Write pandas tests
  for (const [slug, data] of Object.entries(PANDAS_TESTS)) {
    const dir = path.join(testsDir, slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify(data.meta, null, 2) + '\n');
    fs.writeFileSync(path.join(dir, 'test.py'), data.testPy, { mode: 0o755 });
    console.log(`✓ Wrote pandas test suite for ${slug}`);
  }

  // Write JavaScript tests
  for (const [slug, data] of Object.entries(JS_TESTS)) {
    const dir = path.join(testsDir, slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify(data.meta, null, 2) + '\n');
    fs.writeFileSync(path.join(dir, 'test.js'), data.testJs, { mode: 0o755 });
    console.log(`✓ Wrote JavaScript test suite for ${slug}`);
  }

  console.log(`\nSuccessfully populated test suites for all 15 Batch 5 problems.`);
}

main();
