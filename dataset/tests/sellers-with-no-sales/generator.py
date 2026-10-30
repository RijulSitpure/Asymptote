import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Customer VALUES (101, 'Alice'), (102, 'Bob');\nINSERT INTO Orders VALUES (1, '2020-03-01', 1500, 101, 1), (2, '2020-05-25', 2400, 102, 2), (3, '2019-06-11', 800, 101, 3);\nINSERT INTO Seller VALUES (1, 'Daniel'), (2, 'Elizabeth'), (3, 'Frank');"
  }
]
print(json.dumps(cases))
