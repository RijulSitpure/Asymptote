import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO UserPosts VALUES (1, 101, 'positive', '2026-11-01'), (2, 101, 'positive', '2026-11-02'), (3, 101, 'positive', '2026-11-03'), (4, 102, 'positive', '2026-11-01'), (5, 102, 'negative', '2026-11-02'), (6, 102, 'positive', '2026-11-03'), (7, 103, 'neutral', '2026-11-01'), (8, 103, 'neutral', '2026-11-02');"
  }
]

print(json.dumps(cases))
