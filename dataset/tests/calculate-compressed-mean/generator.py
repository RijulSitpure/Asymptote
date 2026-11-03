import json

inserts = "INSERT INTO Orders VALUES (1, 1, 500), (2, 2, 1000), (3, 3, 800), (4, 4, 1000);"

print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
