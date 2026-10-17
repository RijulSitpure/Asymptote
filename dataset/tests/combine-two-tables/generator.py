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

print(json.dumps(cases))
