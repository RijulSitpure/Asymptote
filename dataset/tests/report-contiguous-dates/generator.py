import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Failed VALUES ('2018-12-28'), ('2018-12-29'), ('2019-01-04'), ('2019-01-05');\nINSERT INTO Succeeded VALUES ('2018-12-30'), ('2018-12-31'), ('2019-01-01'), ('2019-01-02'), ('2019-01-03'), ('2019-01-06');"
  }
]
print(json.dumps(cases))
