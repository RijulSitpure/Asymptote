import json

cases = [
  {
    "name": "sample",
    "inserts": "INSERT INTO Weather VALUES (1, \'2022-07-01\', 25), (1, \'2022-07-02\', 30), (1, \'2022-07-03\', 30), (2, \'2022-07-01\', 28), (2, \'2022-07-02\', 26);"
  }
]
print(json.dumps(cases))
