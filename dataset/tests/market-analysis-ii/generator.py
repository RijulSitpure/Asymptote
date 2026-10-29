import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Users VALUES (1, '2019-01-01', 'Lenovo'), (2, '2019-02-09', 'Samsung'), (3, '2019-01-19', 'LG'), (4, '2019-05-21', 'HP');\nINSERT INTO Orders VALUES (1, '2019-08-01', 4, 1, 2), (2, '2019-08-02', 2, 1, 3), (3, '2019-08-03', 3, 2, 3), (4, '2019-08-04', 1, 4, 2);\nINSERT INTO Items VALUES (1, 'Samsung'), (2, 'Lenovo'), (3, 'LG'), (4, 'HP');"
  }
]
print(json.dumps(cases))
