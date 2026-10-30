import json

cases = [
    {
        "name": "example1",
        "inserts": """
INSERT INTO Products VALUES (0, 'store1', 95);
INSERT INTO Products VALUES (0, 'store3', 105);
INSERT INTO Products VALUES (0, 'store2', 100);
INSERT INTO Products VALUES (1, 'store1', 70);
INSERT INTO Products VALUES (1, 'store3', 80);
"""
    }
]
print(json.dumps(cases))
