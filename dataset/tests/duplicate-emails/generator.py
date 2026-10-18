import json, random

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
    'rowCount': 2000,
    'inserts': '\n'.join(scale_inserts)
})

print(json.dumps(cases))
