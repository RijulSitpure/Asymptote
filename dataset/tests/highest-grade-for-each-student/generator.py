import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Enrollments VALUES (2, 2, 95), (2, 3, 95), (1, 1, 90), (1, 2, 99), (3, 1, 80), (3, 2, 75), (3, 3, 82);"
  }
]
print(json.dumps(cases))
