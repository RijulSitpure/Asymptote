import json

cases = [
  {
    "name": "sample",
    "inserts": "INSERT INTO Olympic VALUES ('China', 10, 10, 20), ('South Sudan', 0, 0, 1), ('USA', 10, 10, 20), ('Israel', 2, 2, 3), ('Egypt', 2, 2, 1);"
  }
]
print(json.dumps(cases))
