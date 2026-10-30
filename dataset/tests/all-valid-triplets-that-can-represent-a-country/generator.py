import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO SchoolA VALUES (1, 'Alice'), (2, 'Bob');\nINSERT INTO SchoolB VALUES (3, 'Tom');\nINSERT INTO SchoolC VALUES (3, 'Tom'), (2, 'Jerry'), (10, 'Alice');"
  }
]
print(json.dumps(cases))
