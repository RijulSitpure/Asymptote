import json

cases = [
    {
        "name": "example1",
        "inserts": """
INSERT INTO Candidates VALUES (1, 'Junior', 10000);
INSERT INTO Candidates VALUES (9, 'Junior', 10000);
INSERT INTO Candidates VALUES (2, 'Senior', 20000);
INSERT INTO Candidates VALUES (11, 'Senior', 20000);
INSERT INTO Candidates VALUES (13, 'Senior', 50000);
INSERT INTO Candidates VALUES (4, 'Junior', 40000);
"""
    }
]
print(json.dumps(cases))
