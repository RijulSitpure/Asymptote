import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO UserActivity VALUES ('Alice', 'Travel', '2020-02-12', '2020-02-20'), ('Alice', 'Dancing', '2020-02-21', '2020-02-23'), ('Alice', 'Travel', '2020-02-24', '2020-02-28'), ('Bob', 'Travel', '2020-02-11', '2020-02-18');"
  }
]
print(json.dumps(cases))
