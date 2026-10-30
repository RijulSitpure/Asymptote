import json

cases = [
    {
        "name": "example1",
        "inserts": """
INSERT INTO Members VALUES (9, 'Alice');
INSERT INTO Members VALUES (11, 'Bob');
INSERT INTO Members VALUES (3, 'Winston');
INSERT INTO Members VALUES (8, 'Hercy');
INSERT INTO Members VALUES (1, 'Narihan');
INSERT INTO Visits VALUES (22, 11, '2021-10-28');
INSERT INTO Visits VALUES (16, 11, '2021-01-12');
INSERT INTO Visits VALUES (18, 9, '2021-12-10');
INSERT INTO Visits VALUES (19, 3, '2021-10-19');
INSERT INTO Visits VALUES (12, 11, '2021-03-01');
INSERT INTO Visits VALUES (17, 8, '2021-05-07');
INSERT INTO Visits VALUES (21, 9, '2021-10-23');
INSERT INTO Purchases VALUES (12, 2000);
INSERT INTO Purchases VALUES (18, 1378);
INSERT INTO Purchases VALUES (17, 2724);
INSERT INTO Purchases VALUES (21, 2855);
"""
    }
]
print(json.dumps(cases))
