import json
cases = [
  {
    "name": "example1",
    "inserts": "INSERT INTO Terms VALUES (2, 1), (1, -4), (0, 2);"
  },
  {
    "name": "example2",
    "inserts": "INSERT INTO Terms VALUES (4, -4), (2, 1), (0, -11);"
  }
]
print(json.dumps(cases))
