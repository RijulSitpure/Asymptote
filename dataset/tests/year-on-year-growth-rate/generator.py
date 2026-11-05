import json

inserts = '''
INSERT INTO user_transactions VALUES 
(13424, 123424, 1500.60, '2019-12-31 12:00:00'),
(242323, 123424, 1000.20, '2020-04-09 12:00:00'),
(14123, 123424, 1250.00, '2021-08-11 12:00:00');
'''
print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
