import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Departments VALUES (1, 'Electrical Engineering'), (7, 'Computer Engineering'), (13, 'Business Administration');\nINSERT INTO Students VALUES (23, 'Alice', 1), (1, 'Bob', 7), (5, 'Jennifer', 13), (2, 'John', 14), (4, 'Jasmine', 77), (3, 'Steve', 74), (6, 'Luis', 1), (8, 'Jonathan', 7), (7, 'Daiana', 33), (11, 'Madelynn', 27);"
  }
]
print(json.dumps(cases))
