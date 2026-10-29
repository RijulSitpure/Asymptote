import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Friends VALUES (1, 'Jonathan D.', 'Eating'), (2, 'Jade W.', 'Singing'), (3, 'Victor J.', 'Singing'), (4, 'Elvis Q.', 'Eating'), (5, 'Daniel A.', 'Eating'), (6, 'Bob B.', 'Horse Riding');\nINSERT INTO Activities VALUES (1, 'Eating'), (2, 'Singing'), (3, 'Horse Riding');"
  }
]
print(json.dumps(cases))
