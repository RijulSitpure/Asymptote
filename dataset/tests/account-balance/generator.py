import json

cases = [
    {
        "name": "example1",
        "inserts": """
INSERT INTO Transactions VALUES (1, '2021-11-07', 'Deposit', 2000);
INSERT INTO Transactions VALUES (1, '2021-11-09', 'Withdraw', 1000);
INSERT INTO Transactions VALUES (1, '2021-11-11', 'Deposit', 3000);
INSERT INTO Transactions VALUES (2, '2021-12-07', 'Deposit', 7000);
INSERT INTO Transactions VALUES (2, '2021-12-12', 'Withdraw', 7000);
"""
    }
]
print(json.dumps(cases))
