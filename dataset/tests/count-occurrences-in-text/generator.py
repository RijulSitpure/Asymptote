import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Files VALUES ('file1.txt', 'The bull was strong while the bear rested.'), ('file2.txt', 'A big bull ran past a small bear in the meadow.');"
  }
]
print(json.dumps(cases))
