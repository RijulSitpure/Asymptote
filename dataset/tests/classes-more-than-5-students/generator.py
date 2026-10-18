import json, random

cases = [
    {
        'name': 'standard_example',
        'inserts': """INSERT INTO Courses VALUES 
('A', 'Math'), ('B', 'English'), ('C', 'Math'), ('D', 'Biology'),
('E', 'Math'), ('F', 'Computer'), ('G', 'Math'), ('H', 'Math'), ('I', 'Math');"""
    },
    {
        'name': 'empty_table',
        'inserts': ""
    },
    {
        'name': 'exactly_four_students_fails',
        'inserts': "INSERT INTO Courses VALUES ('A', 'Physics'), ('B', 'Physics'), ('C', 'Physics'), ('D', 'Physics');"
    },
    {
        'name': 'exactly_five_students_qualifies',
        'inserts': "INSERT INTO Courses VALUES ('A', 'Art'), ('B', 'Art'), ('C', 'Art'), ('D', 'Art'), ('E', 'Art');"
    }
]

students = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Henry', 'Iris', 'Jack']
classes = ['Math', 'English', 'Biology', 'Computer', 'History', 'Physics', 'Music']

random.seed(42)
for i in range(20):
    cnt = random.randint(5, 35)
    rows = [f"('{random.choice(students)}_{j}', '{random.choice(classes)}')" for j in range(cnt)]
    cases.append({
        'name': f'random_case_{i+1}',
        'inserts': f"INSERT INTO Courses VALUES {', '.join(rows)};"
    })

# Scale case: 2,000 rows
scale_inserts = []
for b in range(4):
    batch = [f"('Student_{b * 500 + j}', '{random.choice(classes)}')" for j in range(500)]
    scale_inserts.append(f"INSERT INTO Courses VALUES {', '.join(batch)};")

cases.append({
    'name': 'scale_case_2000_rows',
    'rowCount': 2000,
    'inserts': '\n'.join(scale_inserts)
})

print(json.dumps(cases))
