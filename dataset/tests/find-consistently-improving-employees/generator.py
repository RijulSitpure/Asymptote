import json

def generate_cases():
    inserts = [
        "INSERT INTO employees VALUES (1, 'Alice', 'Engineering'), (2, 'Bob', 'Marketing'), (3, 'Charlie', 'Engineering');",
        "INSERT INTO performance_reviews VALUES (1, 1, '2023-01-01', 3), (2, 1, '2023-06-01', 4), (3, 1, '2023-12-01', 5), (4, 2, '2023-01-01', 4), (5, 2, '2023-06-01', 4), (6, 2, '2023-12-01', 5);"
    ]
    return [{"name": "example_1", "inserts": " ".join(inserts)}]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
