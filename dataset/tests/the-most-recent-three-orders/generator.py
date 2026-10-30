import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Customers VALUES (1, 'Winston'), (2, 'Jonathan'), (3, 'Annabelle'), (4, 'Marwan'), (5, 'Khaled');\nINSERT INTO Orders VALUES (1, '2020-07-31', 1, 30), (2, '2020-07-30', 2, 40), (3, '2020-07-31', 3, 20), (4, '2020-07-29', 4, 100), (5, '2020-06-10', 1, 1010), (6, '2020-08-01', 2, 510), (7, '2020-08-01', 1, 111), (8, '2020-08-03', 1, 99), (9, '2020-08-07', 2, 32), (10, '2020-07-15', 1, 99);"
  }
]
print(json.dumps(cases))
