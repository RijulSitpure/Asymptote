import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Point2D (x, y) VALUES (-1, -1), (0, 0), (-1, -2);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
