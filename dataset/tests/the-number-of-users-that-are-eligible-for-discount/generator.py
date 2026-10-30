import json

cases = [
  {
    "name": "standard_eligible_users",
    "inserts": "INSERT INTO Purchases VALUES (1, '2022-03-08', 1200), (2, '2022-03-09', 800), (1, '2022-03-15', 1500), (3, '2022-03-25', 2000);"
  }
]
print(json.dumps(cases))
