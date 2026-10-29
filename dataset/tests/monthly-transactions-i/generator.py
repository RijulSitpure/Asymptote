import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Transactions VALUES (121, 'US', 'approved', 1000, '2018-12-18'), (122, 'US', 'declined', 2000, '2018-12-19'), (123, 'US', 'approved', 2000, '2019-01-01'), (124, 'DE', 'approved', 2000, '2019-01-07');"
  }
]
print(json.dumps(cases))
