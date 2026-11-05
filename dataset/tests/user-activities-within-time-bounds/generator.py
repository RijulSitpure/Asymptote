import json

inserts = '''
INSERT INTO Sessions VALUES 
(1, '2023-11-01 02:00:00', '2023-11-01 03:00:00', 101, 'Viewer'),
(1, '2023-11-01 08:00:00', '2023-11-01 09:00:00', 102, 'Viewer'),
(2, '2023-11-01 02:00:00', '2023-11-01 03:00:00', 201, 'Streamer'),
(2, '2023-11-01 16:00:00', '2023-11-01 17:00:00', 202, 'Streamer');
'''
print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
