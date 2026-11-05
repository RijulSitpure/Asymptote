import json

inserts = '''
INSERT INTO students VALUES 
(1, 'Alice', 'Computer Science'),
(2, 'Bob', 'Computer Science');

INSERT INTO courses VALUES 
(101, 'Algorithms', 4, 'Computer Science', 'Yes'),
(102, 'Data Structures', 4, 'Computer Science', 'Yes'),
(103, 'Web Dev', 3, 'Computer Science', 'No'),
(104, 'AI', 3, 'Computer Science', 'No');

INSERT INTO enrollments VALUES 
(1, 101, 'Fall 2023', 'A', 4.0),
(1, 102, 'Spring 2024', 'A', 4.0),
(1, 103, 'Fall 2023', 'B', 3.0),
(1, 104, 'Spring 2024', 'A', 4.0),
(2, 101, 'Fall 2023', 'A', 4.0),
(2, 102, 'Spring 2024', 'B', 3.0),
(2, 103, 'Fall 2023', 'A', 4.0),
(2, 104, 'Spring 2024', 'A', 4.0);
'''
print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
