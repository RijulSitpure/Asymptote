import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Players VALUES (15, 1), (25, 1), (30, 1), (45, 1), (10, 2), (35, 2), (50, 2), (20, 3), (40, 3);\nINSERT INTO Matches VALUES (1, 15, 45, 3, 0), (2, 30, 25, 1, 2), (3, 30, 15, 2, 0), (4, 40, 20, 5, 2), (5, 35, 50, 1, 1);"
  }
]
print(json.dumps(cases))
