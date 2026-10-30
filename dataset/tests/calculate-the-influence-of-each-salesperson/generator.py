import json

cases = [
  {
    "name": "sample",
    "inserts": "INSERT INTO Salesperson VALUES (1, 'Alice'), (2, 'Bob'), (3, 'Charlie'); INSERT INTO Customer VALUES (1, 1), (2, 1), (3, 2); INSERT INTO Sales VALUES (1, 1, 2000), (2, 2, 500), (3, 3, 1000);"
  }
]
print(json.dumps(cases))
