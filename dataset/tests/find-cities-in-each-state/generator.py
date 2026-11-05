import json

inserts = '''
INSERT INTO cities VALUES 
('New York', 'Buffalo'),
('New York', 'Rochester'),
('California', 'San Francisco'),
('California', 'Los Angeles'),
('Texas', 'Houston'),
('Texas', 'Dallas'),
('Texas', 'Austin');
'''
print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
