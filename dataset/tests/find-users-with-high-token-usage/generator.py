import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO UserTokens VALUES (1, 6000, '2026-11-01'), (1, 5000, '2026-11-02'), (2, 4000, '2026-11-01'), (3, 12000, '2026-11-01');"
  }
]

print(json.dumps(cases))
