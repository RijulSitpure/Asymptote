import json

inserts = '''
INSERT INTO Tweets VALUES 
(135, 13, '2024-02-01', 'Enjoying a sunny day at the park! #fun #sun'),
(136, 14, '2024-02-03', 'Practicing coding! #leetcode'),
(137, 15, '2024-02-04', 'Loving the new features! #leetcode #fun'),
(138, 16, '2024-02-10', 'Great coffee morning! #fun'),
(139, 17, '2024-02-15', 'Another problem solved! #leetcode #contest');
'''
print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
