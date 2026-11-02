import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Schools VALUES (11, 151), (5, 575), (9, 115), (10, 912); INSERT INTO Exam VALUES (975, 10), (966, 60), (844, 76), (849, 99), (689, 145), (946, 200);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
