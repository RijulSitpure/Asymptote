import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Numbers (num, frequency) VALUES (0, 7), (1, 1), (2, 3), (3, 1);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
