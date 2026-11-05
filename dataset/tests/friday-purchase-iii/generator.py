import json

inserts = '''
INSERT INTO Users VALUES 
(11, 'Premium'),
(12, 'VIP'),
(13, 'Standard');

INSERT INTO Purchases VALUES 
(11, '2023-11-03', 1126),
(12, '2023-11-10', 1014),
(13, '2023-11-17', 2000),
(11, '2023-11-24', 500);
'''
print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
