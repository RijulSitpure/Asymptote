import json

cases = [
    {
        "name": "example1",
        "inserts": """
INSERT INTO NewYork VALUES (1, 90);
INSERT INTO NewYork VALUES (2, 87);
INSERT INTO California VALUES (2, 89);
INSERT INTO California VALUES (3, 88);
"""
    }
]
print(json.dumps(cases))
