import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Users VALUES (1, 'hENRy');\nINSERT INTO Users VALUES (2, 'chARLie');\nINSERT INTO Users VALUES (3, 'bOB');\nINSERT INTO Users VALUES (4, 'gRaCe');\nINSERT INTO Users VALUES (5, 'dAvId');\nINSERT INTO Users VALUES (6, 'fRAnK');"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
