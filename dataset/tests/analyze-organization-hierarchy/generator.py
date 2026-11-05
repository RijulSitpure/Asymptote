import json

def generate_cases():
    return [
        {
            "name": "example_1",
            "inserts": "INSERT INTO Employees VALUES (1, 'Alice', NULL, 10000, 'Executive'), (2, 'Bob', 1, 6000, 'Engineering'), (3, 'Charlie', 1, 5500, 'Marketing'), (4, 'David', 2, 4000, 'Engineering'), (5, 'Eve', 2, 3500, 'Engineering');"
        }
    ]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
