import json

def generate_cases():
    return [
        {
            "name": "example_1",
            "inserts": [
                "INSERT INTO Drivers VALUES (1, 'Alice', 30, 5, 1);",
                "INSERT INTO Drivers VALUES (2, 'Bob', 40, 10, 0);",
                "INSERT INTO Drivers VALUES (3, 'Charlie', 25, 2, 2);",
                "INSERT INTO Vehicles VALUES (101, 1, 'Sedan', 'Electric', 15000);",
                "INSERT INTO Vehicles VALUES (102, 2, 'SUV', 'Electric', 25000);",
                "INSERT INTO Vehicles VALUES (103, 3, 'Coupe', 'Gas', 10000);",
                "INSERT INTO Trips VALUES (1, 101, 50, 45, 5);",
                "INSERT INTO Trips VALUES (2, 101, 60, 55, 4);",
                "INSERT INTO Trips VALUES (3, 102, 100, 90, 5);",
                "INSERT INTO Trips VALUES (4, 103, 70, 60, 4);"
            ]
        }
    ]

if __name__ == '__main__':
    print(json.dumps(generate_cases()))
