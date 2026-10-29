import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Spending VALUES (1, '2019-07-01', 'mobile', 100), (1, '2019-07-01', 'desktop', 100), (2, '2019-07-01', 'mobile', 100), (2, '2019-07-02', 'mobile', 100), (3, '2019-07-01', 'desktop', 100), (3, '2019-07-02', 'desktop', 100);"
  }
]
print(json.dumps(cases))
