import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Employees VALUES (1, 'Boss', 1), (3, 'Alice', 3), (2, 'Bob', 1), (4, 'Daniel', 2), (7, 'Luis', 4), (8, 'John', 3), (9, 'Angela', 8), (77, 'Robert', 1);"
  }
]
print(json.dumps(cases))
