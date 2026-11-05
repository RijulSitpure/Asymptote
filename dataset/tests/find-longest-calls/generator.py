import json

inserts = '''
INSERT INTO Contacts VALUES 
(1, 'John', 'Doe'),
(2, 'Jane', 'Smith'),
(3, 'Alice', 'Brown'),
(4, 'Bob', 'White');

INSERT INTO Calls VALUES 
(1, 'incoming', 3665),
(2, 'incoming', 7320),
(3, 'incoming', 1800),
(4, 'incoming', 900),
(1, 'outgoing', 4000),
(2, 'outgoing', 5000),
(3, 'outgoing', 6000),
(4, 'outgoing', 1200);
'''
print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
