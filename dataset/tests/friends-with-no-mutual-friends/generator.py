import json

inserts = '''
INSERT INTO Friends VALUES (1, 2), (2, 3), (3, 4), (1, 4), (2, 5);
'''
print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
