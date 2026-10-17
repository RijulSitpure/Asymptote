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
dept_names = ['IT', 'HR', 'Finance', 'Marketing', 'Engineering']
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

print(json.dumps(cases))
