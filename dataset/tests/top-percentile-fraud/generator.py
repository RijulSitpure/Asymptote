import json

inserts = """INSERT INTO Fraud VALUES (1, 'California', 92), (2, 'California', 68), (3, 'California', 17), (4, 'Colorado', 70), (5, 'Colorado', 55);"""

print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
