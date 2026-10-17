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
        'inserts': 'INSERT INTO Employee VALUES (1, 300), (2, 300), (3, 200), (4, 100);'
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

print(json.dumps(cases))
