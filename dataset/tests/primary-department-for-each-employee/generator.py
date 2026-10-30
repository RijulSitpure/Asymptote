import json

cases = [
    {
        "name": "example1",
        "inserts": """
INSERT INTO Employee VALUES (1, 1, 'N');
INSERT INTO Employee VALUES (2, 1, 'Y');
INSERT INTO Employee VALUES (2, 2, 'N');
INSERT INTO Employee VALUES (3, 3, 'N');
INSERT INTO Employee VALUES (4, 2, 'N');
INSERT INTO Employee VALUES (4, 3, 'Y');
INSERT INTO Employee VALUES (4, 4, 'N');
"""
    }
]
print(json.dumps(cases))
