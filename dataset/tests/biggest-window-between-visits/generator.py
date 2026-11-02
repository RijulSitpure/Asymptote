import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO UserVisits VALUES (1, '2020-12-03');\nINSERT INTO UserVisits VALUES (2, '2020-11-28');\nINSERT INTO UserVisits VALUES (2, '2020-12-03');\nINSERT INTO UserVisits VALUES (3, '2020-11-28');\nINSERT INTO UserVisits VALUES (3, '2020-12-03');\nINSERT INTO UserVisits VALUES (3, '2020-12-09');\nINSERT INTO UserVisits VALUES (3, '2020-12-20');"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
