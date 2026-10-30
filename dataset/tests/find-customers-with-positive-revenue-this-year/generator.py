import json

cases = [
    {
        "name": "example1",
        "inserts": """
INSERT INTO Customers VALUES (1, 2018, 50);
INSERT INTO Customers VALUES (1, 2021, 30);
INSERT INTO Customers VALUES (1, 2020, 70);
INSERT INTO Customers VALUES (2, 2021, -50);
INSERT INTO Customers VALUES (3, 2018, 10);
INSERT INTO Customers VALUES (3, 2021, 0);
INSERT INTO Customers VALUES (4, 2021, 20);
"""
    }
]
print(json.dumps(cases))
