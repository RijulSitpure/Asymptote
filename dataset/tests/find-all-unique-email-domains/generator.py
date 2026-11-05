import json

inserts = '''
INSERT INTO Emails VALUES (1, 'alice@example.com'), (2, 'bob@example.com'), (3, 'charlie@gmail.com'), (4, 'david@org.org');
'''
print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
