import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Listens VALUES (1, 10, '2021-03-15'), (1, 11, '2021-03-15'), (1, 12, '2021-03-15'), (2, 10, '2021-03-15'), (2, 11, '2021-03-15'), (2, 12, '2021-03-15'); INSERT INTO Friendship VALUES (1, 2);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
