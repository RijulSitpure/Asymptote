import json

def generate_cases():
    inserts = [
        "INSERT INTO employees VALUES (1, 'Alice', 'Tech'), (2, 'Bob', 'HR');",
        "INSERT INTO meetings VALUES (101, 1, '2024-05-10', '09:00:00', '10:30:00'), (102, 1, '2024-05-10', '10:00:00', '11:00:00'), (103, 2, '2024-05-10', '09:00:00', '10:00:00'), (104, 2, '2024-05-10', '10:00:00', '11:00:00');"
    ]
    return [{"name": "example_1", "inserts": " ".join(inserts)}]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
