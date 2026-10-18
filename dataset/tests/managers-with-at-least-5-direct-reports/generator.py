import json, random

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
    'rowCount': 2000,
    'inserts': '\n'.join(scale_inserts)
})

print(json.dumps(cases))
