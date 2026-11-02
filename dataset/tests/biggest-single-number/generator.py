import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO MyNumbers (num) VALUES (8), (8), (3), (3), (1), (4), (5), (6);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
