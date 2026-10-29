import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Employee VALUES (1, 8), (2, 8), (3, 8), (4, 7), (5, 9), (6, 9);"
  }
]
print(json.dumps(cases))
