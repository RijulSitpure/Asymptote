import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Sales VALUES ('2020-05-01', 'apples', 10), ('2020-05-01', 'oranges', 8), ('2020-05-02', 'apples', 15), ('2020-05-02', 'oranges', 15), ('2020-05-03', 'apples', 20), ('2020-05-03', 'oranges', 0), ('2020-05-04', 'apples', 15), ('2020-05-04', 'oranges', 16);"
  }
]
print(json.dumps(cases))
