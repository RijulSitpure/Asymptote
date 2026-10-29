import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Logs VALUES (1), (2), (3), (7), (8), (10);"
  }
]
print(json.dumps(cases))
