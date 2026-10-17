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

# Scale case: 2,000 Weather records in 4 batches of 500
# Contains ties (same temp consecutive days), gaps in dates, NULL temperatures, and duplicates
scale_statements = []
cur_date = date(2018, 1, 1)
weather_records = []

for idx in range(1, 2001):
    # Step forward: usually 1 day, occasionally gap of 2-3 days
    if idx % 15 == 0:
        cur_date += timedelta(days=random.randint(2, 4))
    else:
        cur_date += timedelta(days=1)
    
    if idx % 45 == 0:
        temp = "NULL"
    elif idx % 10 == 0:
        temp = "25" # Frequent ties
    else:
        temp = str(random.randint(-20, 42))
    
    weather_records.append((idx, str(cur_date), temp))

# Shuffle records so dates are not inserted strictly in ascending order (tests non-ordered inputs)
random.shuffle(weather_records)

for b in range(4):
    chunk = weather_records[b * 500 : (b + 1) * 500]
    tuples = [f"({eid}, '{d}', {temp})" for eid, d, temp in chunk]
    scale_statements.append(f"INSERT INTO Weather VALUES {', '.join(tuples)};")

cases.append({
    'name': 'scale_case_2000_rows',
    'rowCount': 2000,
    'inserts': '\n'.join(scale_statements)
})

print(json.dumps(cases))
