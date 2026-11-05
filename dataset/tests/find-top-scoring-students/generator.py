import json

inserts = '''
INSERT INTO students VALUES 
(1, 'Alice', 'Computer Science'),
(2, 'Bob', 'Computer Science'),
(3, 'Charlie', 'Mathematics');

INSERT INTO courses VALUES 
(101, 'Algorithms', 3, 'Computer Science'),
(102, 'Data Structures', 3, 'Computer Science'),
(201, 'Calculus', 4, 'Mathematics');

INSERT INTO enrollments VALUES 
(1, 101, 'Fall 2023', 'A'),
(1, 102, 'Spring 2024', 'A'),
(2, 101, 'Fall 2023', 'A'),
(2, 102, 'Spring 2024', 'B'),
(3, 201, 'Fall 2023', 'A');
'''
print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
