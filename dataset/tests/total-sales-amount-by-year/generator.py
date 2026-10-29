import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Product VALUES (1, 'LC Phone '), (2, 'LC T-Shirt'), (3, 'LC Book');\nINSERT INTO Sales VALUES (1, '2019-01-25', '2019-02-28', 100), (2, '2018-12-01', '2020-01-01', 10), (3, '2019-12-01', '2020-01-31', 1);"
  }
]
print(json.dumps(cases))
