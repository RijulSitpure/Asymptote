import json, random

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
    
    ins = f"INSERT INTO Department VALUES {', '.join(d_rows)};\nINSERT INTO Employee VALUES {', '.join(e_rows)};"
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
    'rowCount': 2000,
    'inserts': '\n'.join(scale_inserts)
})

print(json.dumps(cases))
