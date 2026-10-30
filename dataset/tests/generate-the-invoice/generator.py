import json

cases = [
  {
    "name": "sample",
    "inserts": "INSERT INTO Products VALUES (1, 100), (2, 200); INSERT INTO Purchases VALUES (1, 1, 2), (3, 2, 1), (2, 2, 3), (2, 1, 4), (4, 1, 10);"
  }
]
print(json.dumps(cases))
