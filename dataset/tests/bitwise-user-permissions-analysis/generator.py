import json

inserts = '''
INSERT INTO user_permissions VALUES 
(1, 5),
(2, 12),
(3, 7);
'''
print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
