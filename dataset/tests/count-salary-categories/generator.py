import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Accounts VALUES (3, 108939), (2, 12747), (8, 87709), (6, 91796);"
  },
  {
    "name": "case_2",
    "inserts": "INSERT INTO Accounts VALUES (1, 25000), (2, 30000);"
  },
  {
    "name": "case_3",
    "inserts": ""
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
