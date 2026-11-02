import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO DailySales VALUES ('2020-12-07', 'honda', 3, 1);\nINSERT INTO DailySales VALUES ('2020-12-08', 'honda', 0, 3);\nINSERT INTO DailySales VALUES ('2020-12-08', 'toyota', 0, 3);\nINSERT INTO DailySales VALUES ('2020-12-07', 'honda', 3, 1);\nINSERT INTO DailySales VALUES ('2020-12-08', 'honda', 0, 2);\nINSERT INTO DailySales VALUES ('2020-12-08', 'toyota', 0, 2);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
