import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Teams VALUES (10, 'FC Barcelona'), (20, 'New England Revolution'), (30, 'Real Madrid'), (40, 'Liverpool'), (50, 'Chelsea');\nINSERT INTO Matches VALUES (1, 10, 20, 3, 0), (2, 30, 10, 2, 2), (3, 10, 50, 5, 1), (4, 20, 30, 1, 0), (5, 50, 30, 1, 0);"
  }
]
print(json.dumps(cases))
