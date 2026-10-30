import json

cases = [
    {
        "name": "example1",
        "inserts": """
INSERT INTO Days VALUES ('2022-04-12');
INSERT INTO Days VALUES ('2021-08-09');
"""
    }
]
print(json.dumps(cases))
