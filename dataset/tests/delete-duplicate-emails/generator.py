import json, random

cases = [
    {
        'name': 'standard_sample',
        'inserts': "INSERT INTO Person VALUES (1, 'john@example.com'), (2, 'bob@example.com'), (3, 'john@example.com');"
    },
    {
        'name': 'all_unique',
        'inserts': "INSERT INTO Person VALUES (1, 'a@test.com'), (2, 'b@test.com'), (3, 'c@test.com');"
    },
    {
        'name': 'all_identical',
        'inserts': "INSERT INTO Person VALUES (1, 'dup@test.com'), (2, 'dup@test.com'), (3, 'dup@test.com'), (4, 'dup@test.com');"
    },
    {
        'name': 'empty_table',
        'inserts': ''
    }
]

random.seed(42)
pool = [f'user_{k}@domain.org' for k in range(8)]
for i in range(20):
    n = random.randint(1, 30)
    tuples = [f"({eid+1}, '{random.choice(pool)}')" for eid in range(n)]
    cases.append({'name': f'random_case_{i+1}', 'inserts': f"INSERT INTO Person VALUES {', '.join(tuples)};"})

print(json.dumps(cases))
