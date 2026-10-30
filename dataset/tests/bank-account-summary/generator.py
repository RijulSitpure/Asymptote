import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Users VALUES (1, 'Moustafa', 100), (2, 'Jonathan', 200), (3, 'Winston', 10000), (4, 'Luis', 800);\nINSERT INTO Transactions VALUES (1, 1, 3, 400, '2020-08-01'), (2, 3, 2, 500, '2020-08-03'), (3, 2, 1, 200, '2020-08-08');"
  }
]
print(json.dumps(cases))
