import json

cases = [
  {
    "name": "example1",
    "inserts": "INSERT INTO Buses VALUES (1, 11), (2, 20), (3, 30); INSERT INTO Passengers VALUES (11, 1), (12, 5), (13, 6), (14, 7), (15, 14), (16, 16), (17, 17);"
  }
]
print(json.dumps(cases))
