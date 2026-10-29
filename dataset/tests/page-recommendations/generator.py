import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Friendship VALUES (1, 2), (1, 3), (1, 4), (2, 3), (6, 1);\nINSERT INTO Likes VALUES (1, 88), (2, 23), (3, 24), (4, 56), (5, 11), (6, 33), (2, 77), (3, 77), (6, 88);"
  }
]
print(json.dumps(cases))
