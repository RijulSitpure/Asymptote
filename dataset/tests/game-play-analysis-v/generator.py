import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Activity VALUES (1, 2, '2016-03-01', 5), (1, 2, '2016-03-02', 6), (2, 3, '2017-06-25', 1), (3, 1, '2016-03-01', 0), (3, 4, '2016-07-03', 5);"
  }
]
print(json.dumps(cases))
