import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Orders VALUES (1, 1, '2020-06-01', '1', 10), (2, 1, '2020-06-08', '2', 10), (3, 2, '2020-06-02', '1', 5), (4, 3, '2020-06-03', '3', 5), (5, 4, '2020-06-04', '4', 1), (6, 4, '2020-06-05', '5', 5), (7, 5, '2020-06-05', '1', 10), (8, 5, '2020-06-14', '4', 5), (9, 5, '2020-06-21', '3', 5);\nINSERT INTO Items VALUES ('1', 'LC Alg. Book', 'Book'), ('2', 'LC DB. Book', 'Book'), ('3', 'LC Smth. Book', 'Book'), ('4', 'LC Phone', 'Phone'), ('5', 'LC T-Shirt', 'T-shirt');"
  }
]
print(json.dumps(cases))
