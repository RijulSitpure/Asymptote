import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Orders VALUES (1, '2020-09-15', 1, 30), (2, '2020-09-17', 2, 90), (3, '2020-10-06', 3, 20), (4, '2020-10-21', 3, 102), (5, '2020-10-16', 1, 40), (6, '2020-10-19', 1, 5);"
  }
]
print(json.dumps(cases))
