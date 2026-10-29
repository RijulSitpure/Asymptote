import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Actions VALUES (1, 1, '2019-07-01', 'share', 'spam'), (2, 2, '2019-07-04', 'report', 'spam'), (3, 4, '2019-07-04', 'report', 'spam');\nINSERT INTO Removals VALUES (2, '2019-07-20');"
  }
]
print(json.dumps(cases))
