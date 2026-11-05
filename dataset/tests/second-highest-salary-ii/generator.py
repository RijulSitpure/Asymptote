import json

def generate_cases():
    return [
        {
            "name": "example_1",
            "inserts": [
                "INSERT INTO Employees VALUES (1, 70000, 'Sales');",
                "INSERT INTO Employees VALUES (2, 80000, 'Sales');",
                "INSERT INTO Employees VALUES (3, 80000, 'Sales');",
                "INSERT INTO Employees VALUES (4, 90000, 'Sales');",
                "INSERT INTO Employees VALUES (5, 55000, 'IT');",
                "INSERT INTO Employees VALUES (6, 65000, 'IT');",
                "INSERT INTO Employees VALUES (7, 65000, 'IT');",
                "INSERT INTO Employees VALUES (8, 50000, 'Marketing');",
                "INSERT INTO Employees VALUES (9, 55000, 'Marketing');",
                "INSERT INTO Employees VALUES (10, 55000, 'HR');"
            ]
        }
    ]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
