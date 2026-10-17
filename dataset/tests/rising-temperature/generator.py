import json, random
from datetime import date, timedelta

cases = [
    {
        'name': 'standard_consecutive',
        'inserts': """INSERT INTO Weather VALUES
(1, '2015-01-01', 10),
(2, '2015-01-02', 25),
(3, '2015-01-03', 20),
(4, '2015-01-04', 30);"""
    },
    {
        'name': 'gap_in_dates_not_yesterday',
        'inserts': """INSERT INTO Weather VALUES
(1, '2024-01-01', 10),
(2, '2024-01-03', 25);"""
    },
    {
        'name': 'empty_table',
        'inserts': ''
    },
    {
        'name': 'single_day',
        'inserts': "INSERT INTO Weather VALUES (1, '2024-05-10', 15);"
    },
    {
        'name': 'negative_temperatures',
        'inserts': """INSERT INTO Weather VALUES
(1, '2024-02-01', -20),
(2, '2024-02-02', -10),
(3, '2024-02-03', -15);"""
    }
]

random.seed(42)
start_base = date(2023, 1, 1)
for i in range(20):
    n = random.randint(1, 20)
    cur_date = start_base + timedelta(days=i * 30)
    entries = []
    for eid in range(1, n + 1):
        cur_date += timedelta(days=1 if random.random() > 0.3 else random.randint(2, 5))
        entries.append((eid, str(cur_date), random.randint(-25, 45)))
    random.shuffle(entries)
    tuples = [f"({eid}, '{d}', {temp})" for eid, d, temp in entries]
    cases.append({'name': f'random_case_{i+1}', 'inserts': f"INSERT INTO Weather VALUES {', '.join(tuples)};"})

print(json.dumps(cases))
