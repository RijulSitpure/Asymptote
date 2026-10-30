import json

cases = [
  {
    "name": "example1",
    "inserts": "INSERT INTO Data VALUES (4, 2), (2, 3), (3, 1), (1, 4);"
  }
]
print(json.dumps(cases))
