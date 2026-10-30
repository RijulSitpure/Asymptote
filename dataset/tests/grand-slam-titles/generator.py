import json

cases = [
    {
        "name": "example1",
        "inserts": """
INSERT INTO Players VALUES (1, 'Nadal');
INSERT INTO Players VALUES (2, 'Federer');
INSERT INTO Players VALUES (3, 'Novak');
INSERT INTO Championships VALUES (2018, 1, 1, 1, 1);
INSERT INTO Championships VALUES (2019, 1, 1, 2, 2);
INSERT INTO Championships VALUES (2020, 2, 1, 2, 3);
"""
    }
]
print(json.dumps(cases))
