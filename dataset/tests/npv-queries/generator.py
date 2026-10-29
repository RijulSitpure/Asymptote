import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO NPV VALUES (1, 2018, 100), (7, 2020, 30), (13, 2019, 40), (1, 2019, 113), (2, 2008, 121), (3, 2009, 12), (11, 2020, 99), (7, 2019, 0);\nINSERT INTO Queries VALUES (1, 2019), (2, 2008), (3, 2009), (7, 2018), (7, 2019), (7, 2020), (13, 2019);"
  }
]
print(json.dumps(cases))
