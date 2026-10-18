import json, random

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
    'rowCount': 2000,
    'inserts': '\n'.join(scale_inserts)
})

print(json.dumps(cases))
