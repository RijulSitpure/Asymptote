import json
cases = [
  {
    "name": "example1",
    "inserts": "INSERT INTO Flights VALUES (1, 2, 4), (2, 1, 5), (2, 4, 5);"
  },
  {
    "name": "example2_tie",
    "inserts": "INSERT INTO Flights VALUES (1, 2, 4), (3, 4, 4);"
  }
]
print(json.dumps(cases))
