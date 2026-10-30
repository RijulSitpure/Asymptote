import json

cases = [
    {
        "name": "example1",
        "inserts": """
INSERT INTO Orders VALUES (1, 1, 0);
INSERT INTO Orders VALUES (2, 1, 0);
INSERT INTO Orders VALUES (11, 2, 0);
INSERT INTO Orders VALUES (12, 2, 1);
INSERT INTO Orders VALUES (21, 3, 1);
INSERT INTO Orders VALUES (22, 3, 1);
INSERT INTO Orders VALUES (31, 4, 1);
INSERT INTO Orders VALUES (32, 4, 1);
"""
    }
]
print(json.dumps(cases))
