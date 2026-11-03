import json

inserts = """INSERT INTO Triangles VALUES (20, 20, 23), (20, 20, 20), (20, 21, 22), (13, 14, 30);"""

print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
