import json

cases = [
    {
        "name": "example1",
        "inserts": """
INSERT INTO Store VALUES (6, 1, 549);
INSERT INTO Store VALUES (8, 1, 834);
INSERT INTO Store VALUES (4, 2, 394);
INSERT INTO Store VALUES (11, 3, 657);
INSERT INTO Store VALUES (13, 3, 257);
"""
    }
]
print(json.dumps(cases))
