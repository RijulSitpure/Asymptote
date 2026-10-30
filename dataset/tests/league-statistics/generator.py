import json

cases = [
    {
        "name": "example1",
        "inserts": """
INSERT INTO Teams VALUES (1, 'Ajax');
INSERT INTO Teams VALUES (4, 'Dortmund');
INSERT INTO Teams VALUES (6, 'Arsenal');
INSERT INTO Matches VALUES (1, 4, 0, 1);
INSERT INTO Matches VALUES (1, 6, 3, 3);
INSERT INTO Matches VALUES (4, 1, 5, 2);
INSERT INTO Matches VALUES (6, 1, 0, 0);
"""
    }
]
print(json.dumps(cases))
