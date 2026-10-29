import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO TVProgram VALUES ('2020-06-10', 1, 'LC-Channel'), ('2020-05-11', 2, 'LC-Channel'), ('2020-06-18', 3, 'Disney Ch'), ('2020-07-15', 4, 'Disney Ch'), ('2020-06-18', 4, 'Disney Ch'), ('2020-07-15', 5, 'Disney Ch');\nINSERT INTO Content VALUES (1, 'Leetcode Movie', 'Y', 'Movies'), (2, 'Alg. for Kids', 'Y', 'Series'), (3, 'Database Movie', 'n', 'Movies'), (4, 'Aladdin', 'Y', 'Movies'), (5, 'Cinderella', 'Y', 'Movies');"
  }
]
print(json.dumps(cases))
