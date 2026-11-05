import json

def generate_cases():
    inserts = [
        "INSERT INTO drivers VALUES (1, 'Alice'), (2, 'Bob');",
        "INSERT INTO trips VALUES (1, 1, '2024-01-01', 100.0, 10.0), (2, 1, '2024-01-02', 100.0, 10.0), (3, 1, '2024-01-03', 150.0, 10.0), (4, 1, '2024-01-04', 160.0, 10.0), (5, 2, '2024-01-01', 100.0, 10.0), (6, 2, '2024-01-02', 100.0, 10.0), (7, 2, '2024-01-03', 100.0, 10.0), (8, 2, '2024-01-04', 100.0, 10.0);"
    ]
    return [{"name": "example_1", "inserts": " ".join(inserts)}]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
