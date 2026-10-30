import json

cases = [
    {
        "name": "example1",
        "inserts": """
INSERT INTO Accounts VALUES (3, 21000);
INSERT INTO Accounts VALUES (4, 10400);
INSERT INTO Transactions VALUES (1, 3, 'Credited', 10700, '2021-01-19 05:24:22');
INSERT INTO Transactions VALUES (2, 3, 'Credited', 10700, '2021-01-22 06:06:40');
INSERT INTO Transactions VALUES (3, 3, 'Debited', 10000, '2021-01-23 06:00:00');
INSERT INTO Transactions VALUES (4, 3, 'Credited', 22000, '2021-02-10 16:07:40');
INSERT INTO Transactions VALUES (5, 4, 'Credited', 10500, '2021-04-11 12:00:00');
"""
    }
]
print(json.dumps(cases))
