import json

cases = [
    {
        "name": "example1",
        "inserts": """
INSERT INTO Problems VALUES (6, 1290, 425);
INSERT INTO Problems VALUES (11, 267, 1342);
INSERT INTO Problems VALUES (1, 4446, 2760);
INSERT INTO Problems VALUES (7, 8569, 6086);
INSERT INTO Problems VALUES (13, 2050, 4164);
INSERT INTO Problems VALUES (10, 9002, 344);
"""
    }
]
print(json.dumps(cases))
