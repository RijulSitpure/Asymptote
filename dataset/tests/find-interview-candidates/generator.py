import json

cases = [
    {
        "name": "example1",
        "inserts": """
INSERT INTO Contests VALUES (190, 1, 5, 2);
INSERT INTO Contests VALUES (191, 2, 3, 5);
INSERT INTO Contests VALUES (192, 5, 2, 3);
INSERT INTO Contests VALUES (193, 1, 3, 5);
INSERT INTO Contests VALUES (194, 4, 5, 2);
INSERT INTO Contests VALUES (195, 4, 2, 1);
INSERT INTO Contests VALUES (196, 1, 5, 2);
INSERT INTO Users VALUES (1, 'sarah@example.com', 'Sarah');
INSERT INTO Users VALUES (2, 'bob@example.com', 'Bob');
INSERT INTO Users VALUES (3, 'alice@example.com', 'Alice');
INSERT INTO Users VALUES (4, 'hercy@example.com', 'Hercy');
INSERT INTO Users VALUES (5, 'quarcy@example.com', 'Quarcy');
"""
    }
]
print(json.dumps(cases))
