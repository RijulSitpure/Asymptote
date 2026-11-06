import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Customers VALUES (1, 'Alice'), (2, 'Bob'), (3, 'Charlie');\nINSERT INTO Orders VALUES (101, 1, '2026-11-01 18:15:00', 60.00), (102, 1, '2026-11-01 18:45:00', 50.00), (103, 2, '2026-11-01 18:30:00', 40.00), (104, 3, '2026-11-01 19:10:00', 200.00);"
  }
]

print(json.dumps(cases))
