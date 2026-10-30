import json

cases = [
    {
        "name": "example1",
        "inserts": """
INSERT INTO Employees VALUES (2, 'Meir', 3000);
INSERT INTO Employees VALUES (3, 'Michael', 3000);
INSERT INTO Employees VALUES (7, 'Addilyn', 7400);
INSERT INTO Employees VALUES (8, 'Juan', 6100);
INSERT INTO Employees VALUES (9, 'Kannon', 7400);
"""
    }
]
print(json.dumps(cases))
