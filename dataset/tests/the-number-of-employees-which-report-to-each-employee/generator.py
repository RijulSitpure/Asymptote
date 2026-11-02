import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Employees VALUES (9, 'Hercy', NULL, 43);\nINSERT INTO Employees VALUES (6, 'Alice', 9, 41);\nINSERT INTO Employees VALUES (4, 'Bob', 9, 36);\nINSERT INTO Employees VALUES (2, 'Winston', NULL, 37);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
