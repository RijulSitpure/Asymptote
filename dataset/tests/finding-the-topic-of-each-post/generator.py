import json

cases = [
  {
    "name": "standard_topics_match",
    "inserts": "INSERT INTO Keywords VALUES (1, 'handball'), (1, 'football'), (2, 'money'), (2, 'inflation');\nINSERT INTO Posts VALUES (1, 'We love football and handball'), (2, 'Money inflation issues'), (3, 'Pure cooking and recipe text');"
  }
]
print(json.dumps(cases))
