import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Chests VALUES (1, 5, 6);\nINSERT INTO Chests VALUES (2, 10, 20);\nINSERT INTO Chests VALUES (3, 0, 4);\nINSERT INTO Boxes VALUES (1, 1, 15, 4);\nINSERT INTO Boxes VALUES (2, NULL, 5, 12);\nINSERT INTO Boxes VALUES (3, 3, 12, 13);\nINSERT INTO Boxes VALUES (4, 3, 8, 0);\nINSERT INTO Boxes VALUES (5, 3, 11, 10);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
