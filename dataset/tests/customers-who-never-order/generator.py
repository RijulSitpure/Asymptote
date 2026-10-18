import json, random

cases = [
    {
        'name': 'standard_example',
        'inserts': """INSERT INTO Customers VALUES (1, 'Joe'), (2, 'Henry'), (3, 'Sam'), (4, 'Max');
INSERT INTO Orders VALUES (1, 3), (2, 1);"""
    },
    {
        'name': 'empty_tables',
        'inserts': ""
    },
    {
        'name': 'all_customers_ordered',
        'inserts': """INSERT INTO Customers VALUES (1, 'Alice'), (2, 'Bob');
INSERT INTO Orders VALUES (1, 1), (2, 2);"""
    },
    {
        'name': 'no_customers_ordered',
        'inserts': """INSERT INTO Customers VALUES (1, 'Alice'), (2, 'Bob');
INSERT INTO Orders VALUES (1, 999);"""
    }
]

names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Helen']
random.seed(42)
for i in range(20):
    c_count = random.randint(1, 20)
    c_rows = [f"({cid}, '{random.choice(names)}')" for cid in range(1, c_count + 1)]
    o_count = random.randint(0, c_count * 2)
    o_rows = [f"({oid}, {random.randint(1, c_count + 2)})" for oid in range(1, o_count + 1)]
    
    ins = f"INSERT INTO Customers VALUES {', '.join(c_rows)};"
    if o_rows:
        ins += f"\nINSERT INTO Orders VALUES {', '.join(o_rows)};"
    cases.append({
        'name': f'random_case_{i+1}',
        'inserts': ins
    })

# Scale case: 2,000 Customers + 2,000 Orders in 4 batches of 500
scale_inserts = []
for b in range(4):
    c_batch = [f"({b * 500 + j + 1}, '{random.choice(names)}')" for j in range(500)]
    scale_inserts.append(f"INSERT INTO Customers VALUES {', '.join(c_batch)};")
for b in range(4):
    # order from only first 1,000 customers so 1001-2000 have no orders
    o_batch = [f"({b * 500 + j + 1}, {random.randint(1, 1000)})" for j in range(500)]
    scale_inserts.append(f"INSERT INTO Orders VALUES {', '.join(o_batch)};")

cases.append({
    'name': 'scale_case_2000_rows',
    'rowCount': 2000,
    'inserts': '\n'.join(scale_inserts)
})

print(json.dumps(cases))
