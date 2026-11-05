import json

inserts = '''
INSERT INTO Cinema VALUES 
(1, 1),
(2, 0),
(3, 1),
(4, 1),
(5, 1);
'''
print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
