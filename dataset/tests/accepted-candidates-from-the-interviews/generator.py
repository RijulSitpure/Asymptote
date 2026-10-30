import json

cases = [
    {
        "name": "example1",
        "inserts": """
INSERT INTO Candidates VALUES (11, 'Atticus', 1, 101);
INSERT INTO Candidates VALUES (9, 'Ruben', 6, 104);
INSERT INTO Candidates VALUES (6, 'Aliza', 10, 109);
INSERT INTO Candidates VALUES (8, 'Alfredo', 0, 107);
INSERT INTO Rounds VALUES (109, 3, 4);
INSERT INTO Rounds VALUES (101, 2, 8);
INSERT INTO Rounds VALUES (109, 4, 13);
INSERT INTO Rounds VALUES (107, 1, 3);
INSERT INTO Rounds VALUES (104, 3, 6);
INSERT INTO Rounds VALUES (109, 1, 4);
INSERT INTO Rounds VALUES (104, 4, 7);
INSERT INTO Rounds VALUES (104, 1, 2);
INSERT INTO Rounds VALUES (109, 2, 1);
INSERT INTO Rounds VALUES (104, 2, 7);
"""
    }
]
print(json.dumps(cases))
