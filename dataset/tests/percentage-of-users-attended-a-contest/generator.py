import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Users VALUES (6, 'Alice'), (2, 'Bob'), (7, 'Alex');\nINSERT INTO Register VALUES (215, 6), (209, 2), (208, 2), (210, 6), (208, 6), (209, 7), (209, 6), (215, 7), (208, 7), (210, 2), (207, 2), (210, 7);"
  }
]
print(json.dumps(cases))
