import json

cases = [
    {
        "name": "example1",
        "inserts": """
INSERT INTO Subscriptions VALUES (9, '2020-02-18', '2021-10-30');
INSERT INTO Subscriptions VALUES (3, '2021-09-21', '2021-11-13');
INSERT INTO Subscriptions VALUES (11, '2020-02-28', '2020-08-18');
INSERT INTO Subscriptions VALUES (13, '2021-04-06', '2021-10-18');
INSERT INTO Streams VALUES (14, 9, '2020-05-18');
INSERT INTO Streams VALUES (16, 3, '2021-01-26');
INSERT INTO Streams VALUES (12, 11, '2021-03-09');
"""
    }
]
print(json.dumps(cases))
