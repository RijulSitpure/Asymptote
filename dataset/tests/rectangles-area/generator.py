import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Points VALUES (1, 2, 7), (2, 4, 8), (3, 2, 10);"
  }
]
print(json.dumps(cases))
