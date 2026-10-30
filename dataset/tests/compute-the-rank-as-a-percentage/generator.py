import json

cases = [
  {
    "name": "sample",
    "inserts": "INSERT INTO Students VALUES (1, 1, 90), (2, 1, 80), (3, 1, 70), (4, 2, 85), (5, 2, 85);"
  }
]
print(json.dumps(cases))
