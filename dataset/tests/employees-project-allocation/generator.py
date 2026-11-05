import json

inserts = '''
INSERT INTO Project VALUES (1, 1, 45), (1, 2, 30), (2, 3, 40), (2, 4, 30);
INSERT INTO Employees VALUES (1, 'Khaled', 'A'), (2, 'Ali', 'B'), (3, 'John', 'B'), (4, 'Doe', 'A');
'''
print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
