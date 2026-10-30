import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Drivers VALUES (10, '2019-12-10');\nINSERT INTO Rides VALUES (10, 63, '2020-01-04'), (13, 52, '2020-02-22'), (7, 69, '2020-03-16');\nINSERT INTO AcceptedRides VALUES (10, 10, 63, 38), (13, 10, 73, 96), (7, 10, 100, 28);"
  }
]
print(json.dumps(cases))
