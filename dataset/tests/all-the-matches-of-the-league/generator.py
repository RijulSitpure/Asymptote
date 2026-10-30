import json

cases = [
  {
    "name": "sample",
    "inserts": "INSERT INTO Teams VALUES ('Real Madrid'), ('Barcelona'), ('Arsenal');"
  }
]
print(json.dumps(cases))
