import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Customers VALUES (1, 'Winston'), (2, 'Jonathan');\nINSERT INTO Orders VALUES (1, '2020-07-31', 1, 1), (2, '2020-07-30', 2, 2), (3, '2020-08-29', 3, 3), (4, '2020-07-29', 4, 1), (5, '2020-06-10', 1, 2), (6, '2020-08-01', 2, 1), (7, '2020-08-01', 1, 1);\nINSERT INTO Products VALUES (1, 'keyboard', 120), (2, 'mouse', 80), (3, 'screen', 600);"
  }
]
print(json.dumps(cases))
