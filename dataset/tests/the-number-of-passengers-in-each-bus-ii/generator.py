import json

cases = [
  {
    "name": "example1",
    "inserts": "INSERT INTO Buses VALUES (1, 2, 1), (2, 4, 10), (3, 7, 2); INSERT INTO Passengers VALUES (11, 1), (12, 1), (13, 5), (14, 6), (15, 7);"
  }
]
print(json.dumps(cases))
