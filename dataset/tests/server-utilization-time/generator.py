import json

inserts = '''
INSERT INTO Servers VALUES 
(1, '2023-01-01 00:00:00', 'start'),
(1, '2023-01-02 12:00:00', 'stop'),
(2, '2023-01-01 06:00:00', 'start'),
(2, '2023-01-01 18:00:00', 'stop');
'''
print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
