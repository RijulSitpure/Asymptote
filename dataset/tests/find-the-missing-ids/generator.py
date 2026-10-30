import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Customers VALUES (1, 'Alice'), (4, 'Bob'), (5, 'Charlie');"
  }
]
print(json.dumps(cases))
