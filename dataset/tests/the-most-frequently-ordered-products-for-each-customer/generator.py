import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Customers VALUES (1, 'Alice'), (2, 'Bob');\nINSERT INTO Orders VALUES (1, '2020-07-31', 1, 1), (2, '2020-07-30', 2, 2), (3, '2020-08-29', 1, 2), (4, '2020-07-29', 1, 2), (5, '2020-06-10', 1, 1);\nINSERT INTO Products VALUES (1, 'keyboard', 120), (2, 'mouse', 80);"
  }
]
print(json.dumps(cases))
