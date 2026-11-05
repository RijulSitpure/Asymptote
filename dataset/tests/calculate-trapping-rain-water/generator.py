import json

inserts = '''
INSERT INTO Heights VALUES (1, 0), (2, 1), (3, 0), (4, 2), (5, 1), (6, 0), (7, 1), (8, 3), (9, 2), (10, 1), (11, 2), (12, 1);
'''
print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
