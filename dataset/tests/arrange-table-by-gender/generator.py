import json

cases = [
  {
    "name": "sample",
    "inserts": "INSERT INTO Genders VALUES (4, \'male\'), (7, \'female\'), (2, \'other\'), (5, \'male\'), (3, \'female\'), (8, \'male\'), (6, \'other\'), (1, \'other\'), (9, \'female\');"
  }
]
print(json.dumps(cases))
