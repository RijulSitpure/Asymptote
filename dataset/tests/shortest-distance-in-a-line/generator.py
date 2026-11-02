import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Point (x) VALUES (-1), (0), (2);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
