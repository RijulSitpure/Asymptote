import json

inserts = "INSERT INTO Loans VALUES (1, 101, 'Refinance'), (2, 101, 'Mortgage'), (3, 102, 'Refinance'), (4, 103, 'Mortgage');"

print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
