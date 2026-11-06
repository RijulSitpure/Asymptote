import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO UserActions VALUES (1, '2026-01-01', 'login', 10), (1, '2026-01-02', 'login', 10), (1, '2026-01-03', 'login', 10), (2, '2026-01-01', 'view', 5), (2, '2026-01-03', 'view', 5);"
  }
]

print(json.dumps(cases))
