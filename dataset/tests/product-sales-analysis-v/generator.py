import json

cases = [
  {
    "name": "sample",
    "inserts": "INSERT INTO Product VALUES (1, 10), (2, 25), (3, 15); INSERT INTO Sales VALUES (1, 1, 101, 10), (2, 2, 101, 1), (3, 3, 102, 3), (4, 3, 102, 2), (5, 2, 103, 3);"
  }
]
print(json.dumps(cases))
