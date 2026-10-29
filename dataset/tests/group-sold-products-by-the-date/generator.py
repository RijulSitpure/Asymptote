import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Activities VALUES ('2020-05-30', 'Headphones'), ('2020-06-01', 'Pencil'), ('2020-06-02', 'Mask'), ('2020-05-30', 'Basketball'), ('2020-06-01', 'Bible'), ('2020-06-02', 'Mask'), ('2020-05-30', 'T-Shirt');"
  }
]
print(json.dumps(cases))
