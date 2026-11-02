import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Activity VALUES (1, 3, 'start', 4.281);\nINSERT INTO Activity VALUES (1, 1, 'end', 2.781);\nINSERT INTO Activity VALUES (1, 3, 'end', 7.445);\nINSERT INTO Activity VALUES (0, 0, 'end', 8.6);\nINSERT INTO Activity VALUES (4, 0, 'start', 8.92);\nINSERT INTO Activity VALUES (3, 0, 'end', 4.999);\nINSERT INTO Activity VALUES (3, 2, 'start', 3.008);\nINSERT INTO Activity VALUES (2, 0, 'end', 9.195);\nINSERT INTO Activity VALUES (1, 2, 'start', 6.641);\nINSERT INTO Activity VALUES (2, 0, 'start', 7.519);\nINSERT INTO Activity VALUES (1, 0, 'start', 2.284);\nINSERT INTO Activity VALUES (1, 1, 'start', 0.734);\nINSERT INTO Activity VALUES (3, 0, 'start', 1.718);\nINSERT INTO Activity VALUES (3, 1, 'start', 5.498);\nINSERT INTO Activity VALUES (3, 2, 'end', 6.323);\nINSERT INTO Activity VALUES (1, 2, 'end', 7.548);\nINSERT INTO Activity VALUES (1, 0, 'end', 3.825);\nINSERT INTO Activity VALUES (0, 1, 'start', 4.765);\nINSERT INTO Activity VALUES (4, 0, 'end', 13.727);\nINSERT INTO Activity VALUES (0, 0, 'start', 4.622);\nINSERT INTO Activity VALUES (0, 1, 'end', 5.38);\nINSERT INTO Activity VALUES (3, 1, 'end', 6.906);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
