import json

cases = [
  {
    "name": "sample",
    "inserts": "INSERT INTO Tasks VALUES (1, \'2022-06-13\'), (2, \'2022-06-14\'), (3, \'2022-06-18\'), (4, \'2022-06-19\'), (5, \'2022-06-20\'), (6, \'2022-06-25\');"
  }
]
print(json.dumps(cases))
