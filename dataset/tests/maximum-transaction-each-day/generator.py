import json

cases = [
    {
        "name": "example1",
        "inserts": """
INSERT INTO Transactions VALUES (8, '2021-4-3 15:57:28', 57);
INSERT INTO Transactions VALUES (9, '2021-4-28 08:47:25', 21);
INSERT INTO Transactions VALUES (1, '2021-4-29 13:28:30', 58);
INSERT INTO Transactions VALUES (5, '2021-4-28 16:39:59', 40);
INSERT INTO Transactions VALUES (6, '2021-4-29 23:39:28', 58);
"""
    }
]
print(json.dumps(cases))
