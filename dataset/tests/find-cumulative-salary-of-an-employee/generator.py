import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Employee (id, month, salary) VALUES (1, 1, 20), (2, 1, 20), (1, 2, 30), (2, 2, 30), (3, 2, 40), (1, 3, 40), (3, 3, 60), (1, 4, 60), (3, 4, 70);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
