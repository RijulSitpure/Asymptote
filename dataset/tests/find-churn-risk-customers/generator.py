import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Customers VALUES (1, 'David'), (2, 'Emma'), (3, 'Frank');\nINSERT INTO Subscriptions VALUES (10, 1, '2025-11-15', '2026-11-15', 0), (20, 2, '2025-11-20', '2026-11-20', 1), (30, 3, '2025-12-05', '2026-12-05', 0);"
  }
]

print(json.dumps(cases))
