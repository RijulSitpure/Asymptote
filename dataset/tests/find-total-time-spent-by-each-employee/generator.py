import json

cases = [
    {
        "name": "example1",
        "inserts": """
INSERT INTO Employees VALUES (1, '2020-11-28', 4, 32);
INSERT INTO Employees VALUES (1, '2020-11-28', 55, 200);
INSERT INTO Employees VALUES (1, '2020-12-03', 1, 42);
INSERT INTO Employees VALUES (2, '2020-11-28', 3, 33);
INSERT INTO Employees VALUES (2, '2020-12-09', 47, 74);
"""
    }
]
print(json.dumps(cases))
