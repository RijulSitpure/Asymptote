import json, random

cases = [
    {
        'name': 'standard_example',
        'inserts': "INSERT INTO Logs VALUES (1, 1), (2, 1), (3, 1), (4, 2), (5, 1), (6, 2), (7, 2);"
    },
    {
        'name': 'empty_table',
        'inserts': ""
    },
    {
        'name': 'no_consecutive',
        'inserts': "INSERT INTO Logs VALUES (1, 1), (2, 2), (3, 1), (4, 2), (5, 3);"
    },
    {
        'name': 'multiple_consecutive_numbers',
        'inserts': "INSERT INTO Logs VALUES (1, 3), (2, 3), (3, 3), (4, 5), (5, 5), (6, 5);"
    },
    {
        'name': 'gap_in_ids_not_consecutive',
        'inserts': "INSERT INTO Logs VALUES (1, 1), (2, 1), (4, 1);"
    }
]

random.seed(42)
for i in range(20):
    cnt = random.randint(3, 30)
    # create occasional 3-streaks
    nums = []
    curr = random.randint(1, 5)
    for _ in range(cnt):
        if random.random() < 0.4:
            nums.append(curr)
        else:
            curr = random.randint(1, 5)
            nums.append(curr)
    vals = [f"({j+1}, {nums[j]})" for j in range(cnt)]
    cases.append({
        'name': f'random_case_{i+1}',
        'inserts': f"INSERT INTO Logs VALUES {', '.join(vals)};"
    })

# Scale case: 2,000 rows in 4 batches of 500
scale_inserts = []
for b in range(4):
    batch = [f"({b * 500 + j + 1}, {random.randint(1, 8)})" for j in range(500)]
    scale_inserts.append(f"INSERT INTO Logs VALUES {', '.join(batch)};")

cases.append({
    'name': 'scale_case_2000_rows',
    'rowCount': 2000,
    'inserts': '\n'.join(scale_inserts)
})

print(json.dumps(cases))
