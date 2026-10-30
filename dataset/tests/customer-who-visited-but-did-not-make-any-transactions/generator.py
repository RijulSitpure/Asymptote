import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Visits VALUES (1, 23), (2, 9), (4, 30), (5, 54), (6, 96), (7, 54), (8, 54);\nINSERT INTO Transactions VALUES (2, 5, 310), (3, 5, 300), (9, 4, 200), (12, 1, 910), (13, 2, 970);"
  }
]
print(json.dumps(cases))
