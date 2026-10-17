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

# Scale case: 2,000 Person rows in 4 batches of 500
# Contains ties, duplicate emails across multiple IDs, and NULLs
scale_statements = []
scale_email_pool = [f'member_{k:03d}@asymptote.ai' for k in range(40)]

for b in range(4):
    batch_vals = []
    for j in range(500):
        eid = b * 500 + j + 1
        if eid % 100 == 0:
            email = "NULL"
        else:
            email = f"'{scale_email_pool[eid % len(scale_email_pool)]}'"
        batch_vals.append(f"({eid}, {email})")
    scale_statements.append(f"INSERT INTO Person VALUES {', '.join(batch_vals)};")

cases.append({
    'name': 'scale_case_2000_rows',
    'rowCount': 2000,
    'inserts': '\n'.join(scale_statements)
})

print(json.dumps(cases))
