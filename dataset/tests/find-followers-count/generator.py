import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Followers VALUES (0, 5);\nINSERT INTO Followers VALUES (1, 2);\nINSERT INTO Followers VALUES (0, 3);\nINSERT INTO Followers VALUES (2, 3);\nINSERT INTO Followers VALUES (2, 0);\nINSERT INTO Followers VALUES (2, 2);\nINSERT INTO Followers VALUES (1, 4);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
