import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Employees VALUES (1, 'Alice'), (7, 'Bob'), (11, 'Meir'), (90, 'Winston'), (3, 'Jonathan');\nINSERT INTO EmployeeUNI VALUES (3, 1), (11, 2), (90, 3);"
  }
]
print(json.dumps(cases))
