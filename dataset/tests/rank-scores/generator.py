import json, random

cases = [
    {
        'name': 'standard_example',
        'inserts': "INSERT INTO Scores VALUES (1, 3.50), (2, 3.65), (3, 4.00), (4, 3.85), (5, 4.00), (6, 3.65);"
    },
    {
        'name': 'empty_table',
        'inserts': ""
    },
    {
        'name': 'single_score',
        'inserts': "INSERT INTO Scores VALUES (1, 3.14);"
    },
    {
        'name': 'all_identical_scores',
        'inserts': "INSERT INTO Scores VALUES (1, 5.00), (2, 5.00), (3, 5.00), (4, 5.00);"
    },
    {
        'name': 'strictly_descending',
        'inserts': "INSERT INTO Scores VALUES (1, 4.50), (2, 4.00), (3, 3.50), (4, 3.00);"
    }
]

random.seed(42)
for i in range(20):
    cnt = random.randint(2, 25)
    vals = [f"({j+1}, {random.randint(100, 999) / 100.0:.2f})" for j in range(cnt)]
    cases.append({
        'name': f'random_case_{i+1}',
        'inserts': f"INSERT INTO Scores VALUES {', '.join(vals)};"
    })

# Scale case: 2,000 rows in 4 batches of 500
scale_inserts = []
for b in range(4):
    batch = [f"({b * 500 + j + 1}, {random.randint(100, 999) / 100.0:.2f})" for j in range(500)]
    scale_inserts.append(f"INSERT INTO Scores VALUES {', '.join(batch)};")

cases.append({
    'name': 'scale_case_2000_rows',
    'rowCount': 2000,
    'inserts': '\n'.join(scale_inserts)
})

print(json.dumps(cases))
