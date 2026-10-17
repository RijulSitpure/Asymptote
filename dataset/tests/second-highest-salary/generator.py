import json, random

cases = [
    {
        'name': 'standard_distinct',
        'inserts': 'INSERT INTO Employee VALUES (1, 100), (2, 200), (3, 300);'
    },
    {
        'name': 'only_one_employee',
        'inserts': 'INSERT INTO Employee VALUES (1, 100);'
    },
    {
        'name': 'empty_table',
        'inserts': ''
    },
    {
        'name': 'all_duplicate_salaries',
        'inserts': 'INSERT INTO Employee VALUES (1, 500), (2, 500), (3, 500);'
    },
    {
        'name': 'negative_salaries',
        'inserts': 'INSERT INTO Employee VALUES (1, -100), (2, -200), (3, -50);'
    },
    {
        'name': 'duplicate_max_salary',
        'inserts': 'INSERT INTO Employee VALUES (1, 300), (2, 300), (200, 200), (4, 100);'
    }
]

random.seed(42)
for i in range(20):
    n = random.randint(0, 25)
    if n == 0:
        cases.append({'name': f'random_case_{i+1}', 'inserts': ''})
    else:
        salaries = [random.randint(-1000, 5000) for _ in range(n)]
        tuples = [f'({eid+1}, {sal})' for eid, sal in enumerate(salaries)]
        cases.append({'name': f'random_case_{i+1}', 'inserts': f"INSERT INTO Employee VALUES {', '.join(tuples)};"})

# Scale case: 2,000 Employee rows in 4 batches of 500
# Contains NULL salaries, ties for highest (100,000) and second highest (95,000), and duplicates
scale_statements = []
salary_pool = [10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 95000, 100000]

for b in range(4):
    batch_vals = []
    for j in range(500):
        eid = b * 500 + j + 1
        if eid % 50 == 0:
            sal = "NULL"
        elif eid % 40 == 0:
            sal = "100000" # Tied highest
        elif eid % 35 == 0:
            sal = "95000"  # Tied second highest
        else:
            sal = str(random.choice(salary_pool))
        batch_vals.append(f"({eid}, {sal})")
    scale_statements.append(f"INSERT INTO Employee VALUES {', '.join(batch_vals)};")

cases.append({
    'name': 'scale_case_2000_rows',
    'rowCount': 2000,
    'inserts': '\n'.join(scale_statements)
})

print(json.dumps(cases))
