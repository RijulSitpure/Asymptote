import json

inserts = """INSERT INTO Tree VALUES (1, 2), (3, 2), (6, 8), (9, 8), (2, 5), (8, 5), (5, NULL);"""

print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
