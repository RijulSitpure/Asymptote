import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Customers VALUES (1, 'Daniel'), (2, 'Diana'), (3, 'Elizabeth'), (4, 'Jhon');\nINSERT INTO Orders VALUES (10, 1, 'A'), (20, 1, 'B'), (30, 1, 'D'), (40, 1, 'C'), (50, 2, 'A'), (60, 3, 'A'), (70, 3, 'B'), (80, 3, 'D'), (90, 4, 'C');"
  }
]
print(json.dumps(cases))
