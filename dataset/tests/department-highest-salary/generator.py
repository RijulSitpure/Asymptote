import json, random

cases = [
    {
        'name': 'standard_sample',
        'inserts': """INSERT INTO Department VALUES (1, 'IT'), (2, 'Sales');
INSERT INTO Employee VALUES
(1, 'Joe', 85000, 1),
(2, 'Henry', 80000, 2),
(3, 'Sam', 60000, 2),
(4, 'Max', 90000, 1),
(5, 'Janet', 69000, 1),
(6, 'Randy', 85000, 1),
(7, 'Will', 70000, 1);"""
    },
    {
        'name': 'empty_tables',
        'inserts': ''
    },
    {
        'name': 'ties_for_highest',
        'inserts': """INSERT INTO Department VALUES (1, 'Engineering');
INSERT INTO Employee VALUES (1, 'Alice', 100000, 1), (2, 'Bob', 100000, 1);"""
    },
    {
        'name': 'department_without_employees',
        'inserts': """INSERT INTO Department VALUES (1, 'IT'), (2, 'HR');
INSERT INTO Employee VALUES (1, 'Mark', 50000, 1);"""
    }
]

random.seed(42)
dept_names = ['IT', 'HR', 'Finance', 'Marketing', 'Engineering', 'Operations', 'Legal', 'Product']
emp_names = ['Alex', 'Chris', 'Taylor', 'Jordan', 'Morgan', 'Casey', 'Sam', 'Jamie', 'Robin']

for i in range(20):
    d_count = random.randint(1, 4)
    depts = [(did, dept_names[did - 1]) for did in range(1, d_count + 1)]
    d_inserts = [f"({did}, '{name}')" for did, name in depts]
    
    e_count = random.randint(0, 15)
    employees = []
    for eid in range(1, e_count + 1):
        did = random.randint(1, d_count)
        employees.append((eid, f'{random.choice(emp_names)}_{eid}', random.choice([50000, 60000, 70000, 80000, 90000, 100000]), did))
    e_inserts = [f"({eid}, '{name}', {sal}, {did})" for eid, name, sal, did in employees]
    
    ins_sql = f"INSERT INTO Department VALUES {', '.join(d_inserts)};\n"
    if e_inserts:
        ins_sql += f"INSERT INTO Employee VALUES {', '.join(e_inserts)};"
    cases.append({'name': f'random_case_{i+1}', 'inserts': ins_sql})

# Scale case: 8 Departments + 2,000 Employees in 4 batches of 500
# Contains ties for highest salary in departments, duplicate salaries, and NULL departmentId
scale_statements = []
d_inserts = [f"({did}, '{dept_names[did - 1]}')" for did in range(1, 9)]
scale_statements.append(f"INSERT INTO Department VALUES {', '.join(d_inserts)};")

salary_levels = [40000, 50000, 60000, 70000, 80000, 90000, 100000, 120000]

for b in range(4):
    batch_vals = []
    for j in range(500):
        eid = b * 500 + j + 1
        name = f"'{random.choice(emp_names)}_{eid % 20}'"
        if eid % 60 == 0:
            did = "NULL" # Employee without department
            sal = 50000
        else:
            did = str((eid % 8) + 1)
            # Create guaranteed ties for max salary (120000) in each department
            if eid % 25 == 0:
                sal = 120000 # Tied max
            else:
                sal = random.choice(salary_levels[:6])
        batch_vals.append(f"({eid}, {name}, {sal}, {did})")
    scale_statements.append(f"INSERT INTO Employee VALUES {', '.join(batch_vals)};")

cases.append({
    'name': 'scale_case_2000_rows',
    'rowCount': 2008,
    'inserts': '\n'.join(scale_statements)
})

print(json.dumps(cases))
