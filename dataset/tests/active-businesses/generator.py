import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Events VALUES (1, 'reviews', 7), (3, 'reviews', 3), (1, 'ads', 11), (2, 'ads', 7), (3, 'ads', 6), (1, 'page views', 3), (2, 'page views', 12);"
  }
]
print(json.dumps(cases))
