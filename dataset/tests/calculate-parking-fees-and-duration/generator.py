import json

inserts = '''
INSERT INTO ParkingTransactions VALUES 
(1, 101, '2023-06-01 10:00:00', '2023-06-01 12:00:00', 20.00),
(2, 101, '2023-06-02 10:00:00', '2023-06-02 13:00:00', 36.00),
(1, 102, '2023-06-01 11:00:00', '2023-06-01 12:30:00', 15.00);
'''
print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
