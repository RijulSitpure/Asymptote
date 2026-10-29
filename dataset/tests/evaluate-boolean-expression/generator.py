import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Variables VALUES ('x', 66), ('y', 77);\nINSERT INTO Expressions VALUES ('x', '>', 'y'), ('x', '<', 'y'), ('x', '=', 'y'), ('y', '>', 'x'), ('y', '<', 'x'), ('x', '=', 'x');"
  }
]
print(json.dumps(cases))
