import json

inserts = "INSERT INTO Scores VALUES (1, 'Alice', 80, 75, 90), (2, 'Bob', 90, 85, 95), (3, 'Charlie', 60, 70, 65);"

print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
