import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Cinema (seat_id, free) VALUES (1, 1), (2, 0), (3, 1), (4, 1), (5, 1);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
