import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Accounts VALUES (1, 'Winston'), (7, 'Jonathan');\nINSERT INTO Logins VALUES (7, '2020-05-30'), (1, '2020-05-30'), (7, '2020-05-31'), (7, '2020-06-01'), (7, '2020-06-02'), (7, '2020-06-02'), (7, '2020-06-03'), (1, '2020-06-07'), (7, '2020-06-10');"
  }
]
print(json.dumps(cases))
