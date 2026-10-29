import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Submissions VALUES (1, NULL), (2, NULL), (1, NULL), (12, 1), (3, 1), (5, 2), (3, 1), (4, 1), (9, 1), (10, 2), (6, 7);"
  }
]
print(json.dumps(cases))
