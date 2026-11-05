import json

inserts = '''
INSERT INTO UserActivity VALUES 
(1, '2023-01-01', 'free_trial', 30),
(1, '2023-01-02', 'free_trial', 45),
(1, '2023-01-10', 'paid', 60),
(1, '2023-01-11', 'paid', 50),
(2, '2023-01-01', 'free_trial', 20),
(2, '2023-01-05', 'cancelled', 0),
(3, '2023-02-01', 'free_trial', 40),
(3, '2023-02-08', 'paid', 80);
'''
print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
