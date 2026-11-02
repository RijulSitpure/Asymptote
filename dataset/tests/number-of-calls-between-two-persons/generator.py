import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Calls VALUES (3, 4, 70);\nINSERT INTO Calls VALUES (3, 2, 26);\nINSERT INTO Calls VALUES (2, 3, 54);\nINSERT INTO Calls VALUES (1, 4, 139);\nINSERT INTO Calls VALUES (2, 4, 128);\nINSERT INTO Calls VALUES (3, 1, 47);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
