import json

inserts = "INSERT INTO Coordinates VALUES (20, 20), (20, 20), (20, 21), (23, 22), (22, 23), (21, 20);"

print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
