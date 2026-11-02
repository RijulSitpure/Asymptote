import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Friends VALUES (1, 2), (1, 3), (2, 4), (2, 5), (3, 6);"
  }
]
print(json.dumps(cases))
