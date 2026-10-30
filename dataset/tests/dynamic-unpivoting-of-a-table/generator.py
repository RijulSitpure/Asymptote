import json

cases = [
  {
    "name": "standard_unpivot_case",
    "inserts": "INSERT INTO Products VALUES (1, 100, NULL, 110, NULL), (2, NULL, 200, NULL, 190);"
  }
]
print(json.dumps(cases))
