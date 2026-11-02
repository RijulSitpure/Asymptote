import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Relations VALUES (1, 3), (2, 3), (7, 3), (1, 4), (2, 4), (7, 4), (1, 5), (2, 5), (1, 7), (2, 7);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
