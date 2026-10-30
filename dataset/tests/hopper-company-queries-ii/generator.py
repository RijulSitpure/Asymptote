import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Drivers VALUES (10, '2019-12-10'), (8, '2020-01-13'), (5, '2020-02-16'), (7, '2020-03-08'), (4, '2020-05-17'), (1, '2020-10-24'), (6, '2021-01-05');\nINSERT INTO Rides VALUES (10, 63, '2020-03-04'), (13, 52, '2020-06-22'), (7, 69, '2020-07-16');\nINSERT INTO AcceptedRides VALUES (10, 10, 63, 38), (13, 10, 73, 96), (7, 8, 100, 28);"
  }
]
print(json.dumps(cases))
