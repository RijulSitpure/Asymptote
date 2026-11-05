import json

def generate_cases():
    inserts = [
        "INSERT INTO patients VALUES (1, 'Alice', 30), (2, 'Bob', 45), (3, 'Charlie', 50);",
        "INSERT INTO covid_tests VALUES (1, 1, '2023-01-01', 'Positive'), (2, 1, '2023-01-10', 'Negative'), (3, 2, '2023-02-01', 'Positive'), (4, 3, '2023-03-01', 'Negative');"
    ]
    return [{"name": "example_1", "inserts": " ".join(inserts)}]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
