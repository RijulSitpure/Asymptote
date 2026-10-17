import json, random

cases = [
    {
        'name': 'basic_with_and_without_address',
        'inserts': """INSERT INTO Person VALUES (1, 'Wang', 'Allen'), (2, 'Alice', 'Bob');
INSERT INTO Address VALUES (1, 2, 'New York City', 'New York');"""
    },
    {
        'name': 'empty_tables',
        'inserts': ''
    },
    {
        'name': 'no_matching_addresses',
        'inserts': """INSERT INTO Person VALUES (1, 'Smith', 'John'), (2, 'Doe', 'Jane');
INSERT INTO Address VALUES (1, 999, 'Chicago', 'Illinois');"""
    },
    {
        'name': 'all_have_addresses',
        'inserts': """INSERT INTO Person VALUES (1, 'Lee', 'David'), (2, 'Park', 'Grace');
INSERT INTO Address VALUES (1, 1, 'Seattle', 'Washington'), (2, 2, 'Boston', 'Massachusetts');"""
    }
]

random.seed(42)
first_names = ['Liam', 'Olivia', 'Noah', 'Emma', 'Oliver', 'Ava', 'Elijah', 'Sophia']
last_names = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller']
cities = ['Austin', 'Denver', 'Miami', 'Atlanta', 'Portland', 'Dallas']
states = ['Texas', 'Colorado', 'Florida', 'Georgia', 'Oregon']

for i in range(20):
    p_count = random.randint(1, 15)
    persons = [(pid, random.choice(last_names), random.choice(first_names)) for pid in range(1, p_count + 1)]
    p_inserts = [f"({pid}, '{ln}', '{fn}')" for pid, ln, fn in persons]
    
    a_count = random.randint(0, p_count)
    chosen_pids = random.sample(range(1, p_count + 1), a_count) if a_count > 0 else []
    addresses = [(aid + 1, pid, random.choice(cities), random.choice(states)) for aid, pid in enumerate(chosen_pids)]
    a_inserts = [f"({aid}, {pid}, '{c}', '{s}')" for aid, pid, c, s in addresses]
    
    ins_sql = f"INSERT INTO Person VALUES {', '.join(p_inserts)};\n"
    if a_inserts:
        ins_sql += f"INSERT INTO Address VALUES {', '.join(a_inserts)};"
    
    cases.append({
        'name': f'random_case_{i+1}',
        'inserts': ins_sql
    })

# Scale case: 2,000 Person rows + 2,000 Address rows (batches of 500)
# Contains NULLs, ties (repeated names), and duplicates
scale_statements = []

# 2000 Persons in 4 batches of 500
for b in range(4):
    batch_vals = []
    for j in range(500):
        pid = b * 500 + j + 1
        fn = "NULL" if pid % 40 == 0 else f"'{random.choice(first_names)}'"
        ln = "NULL" if pid % 50 == 0 else f"'{random.choice(last_names)}'"
        batch_vals.append(f"({pid}, {ln}, {fn})")
    scale_statements.append(f"INSERT INTO Person VALUES {', '.join(batch_vals)};")

# 2000 Addresses in 4 batches of 500
# In LeetCode 175, each person has at most 1 address.
# We select 1000 distinct personIds from 1..2000 to have addresses.
# The remaining 1000 address records have personId pointing to IDs outside 1..2000 or NULL.
assigned_pids = list(range(1, 1001))
unmatched_pids = [3000 + k for k in range(1000)]
for idx in range(0, 1000, 25):
    unmatched_pids[idx] = "NULL"

all_address_pids = assigned_pids + unmatched_pids
random.shuffle(all_address_pids)

for b in range(4):
    batch_vals = []
    for j in range(500):
        aid = b * 500 + j + 1
        pid = all_address_pids[aid - 1]
        city = "NULL" if aid % 45 == 0 else f"'{random.choice(cities)}'"
        state = "NULL" if aid % 55 == 0 else f"'{random.choice(states)}'"
        batch_vals.append(f"({aid}, {pid}, {city}, {state})")
    scale_statements.append(f"INSERT INTO Address VALUES {', '.join(batch_vals)};")

cases.append({
    'name': 'scale_case_2000_rows',
    'rowCount': 4000,
    'inserts': '\n'.join(scale_statements)
})

print(json.dumps(cases))
