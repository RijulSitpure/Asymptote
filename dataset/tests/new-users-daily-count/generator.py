import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Traffic VALUES (1, 'login', '2019-05-01'), (1, 'homepage', '2019-05-01'), (1, 'logout', '2019-05-01'), (2, 'login', '2019-06-21'), (2, 'logout', '2019-06-21'), (3, 'login', '2019-01-01'), (3, 'jobs', '2019-01-01'), (3, 'logout', '2019-01-01'), (4, 'login', '2019-06-21'), (5, 'login', '2019-03-01');"
  }
]
print(json.dumps(cases))
