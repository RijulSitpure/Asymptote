import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Transactions VALUES (101, 'US', 'approved', 1000, '2019-05-18'), (102, 'US', 'declined', 2000, '2019-05-19'), (103, 'US', 'approved', 3000, '2019-06-10');\nINSERT INTO Chargebacks VALUES (102, '2019-05-29');"
  }
]
print(json.dumps(cases))
