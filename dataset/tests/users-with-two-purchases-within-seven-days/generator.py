import json

cases = [
  {
    "name": "two_purchases_within_7_days",
    "inserts": "INSERT INTO Purchases VALUES (1, 1, '2022-05-01'), (2, 1, '2022-05-05'), (3, 2, '2022-05-01'), (4, 2, '2022-05-15');"
  }
]
print(json.dumps(cases))
