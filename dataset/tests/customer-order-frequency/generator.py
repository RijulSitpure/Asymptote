import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Customers VALUES (1, 'Winston', 'USA'), (2, 'Jonathan', 'Peru'), (3, 'Moustafa', 'Egypt');\nINSERT INTO Product VALUES (10, 'LC Phone', 300), (20, 'LC T-Shirt', 10), (30, 'LC Book', 45);\nINSERT INTO Orders VALUES (1, 1, 10, '2020-06-10', 1), (2, 1, 20, '2020-07-01', 10), (3, 2, 20, '2020-07-08', 2), (4, 2, 30, '2020-06-05', 1), (5, 3, 30, '2020-06-10', 2), (6, 3, 10, '2020-07-15', 2);"
  }
]
print(json.dumps(cases))
