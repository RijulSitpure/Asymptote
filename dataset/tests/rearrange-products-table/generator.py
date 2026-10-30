import json

cases = [
    {
        "name": "example1",
        "inserts": """
INSERT INTO Products VALUES (0, 95, 100, 105);
INSERT INTO Products VALUES (1, 70, NULL, 80);
"""
    }
]
print(json.dumps(cases))
