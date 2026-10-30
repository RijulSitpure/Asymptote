import json

cases = [
  {
    "name": "sample",
    "inserts": "INSERT INTO Teacher VALUES (1, 2, 3), (1, 2, 4), (1, 3, 3), (2, 1, 1), (2, 2, 1), (2, 3, 1), (2, 4, 1);"
  }
]
print(json.dumps(cases))
