import json

cases = [
    {
        "name": "example1",
        "inserts": """
INSERT INTO Tasks VALUES (1, 3);
INSERT INTO Tasks VALUES (2, 2);
INSERT INTO Tasks VALUES (3, 4);
INSERT INTO Executed VALUES (1, 2);
INSERT INTO Executed VALUES (3, 1);
INSERT INTO Executed VALUES (3, 2);
INSERT INTO Executed VALUES (3, 3);
INSERT INTO Executed VALUES (3, 4);
"""
    }
]
print(json.dumps(cases))
