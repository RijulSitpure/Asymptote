import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Sessions VALUES (1, 30), (2, 199), (3, 299), (4, 580), (5, 1000);"
  }
]
print(json.dumps(cases))
