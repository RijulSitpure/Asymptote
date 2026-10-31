import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Transactions VALUES (1, 101, '2023-05-01', 100), (2, 101, '2023-05-02', 150), (3, 101, '2023-05-03', 200), (4, 102, '2023-05-01', 50), (5, 102, '2023-05-03', 100);"
  }
]
print(json.dumps(cases))
