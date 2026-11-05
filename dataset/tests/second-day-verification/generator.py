import json

inserts = '''
INSERT INTO emails VALUES 
(125, 7771, '2022-06-14 09:30:00'),
(236, 6950, '2022-06-05 10:20:00'),
(433, 1052, '2022-07-09 20:00:00');

INSERT INTO texts VALUES 
(1, 125, 'Verified', '2022-06-15 08:30:00'),
(2, 236, 'Not Verified', '2022-06-06 10:14:00'),
(3, 433, 'Verified', '2022-07-11 09:00:00');
'''
print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
