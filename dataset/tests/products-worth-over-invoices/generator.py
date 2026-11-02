import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Product VALUES (0, 'Ham');\nINSERT INTO Product VALUES (1, 'Bacon');\nINSERT INTO Product VALUES (2, 'Cheese');\nINSERT INTO Product VALUES (3, 'Milk');\nINSERT INTO Invoice VALUES (1, 2, 10, 13, 36, 31);\nINSERT INTO Invoice VALUES (2, 2, 34, 41, 1, 10);\nINSERT INTO Invoice VALUES (3, 2, 9, 38, 34, 13);\nINSERT INTO Invoice VALUES (4, 3, 45, 27, 20, 45);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
