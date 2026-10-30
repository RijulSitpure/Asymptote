import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Salary VALUES (1, 'Todd', 'Wilson', 110000, 'D1'), (1, 'Todd', 'Wilson', 106119, 'D1'), (2, 'Justin', 'Simon', 128922, 'D2'), (2, 'Justin', 'Simon', 130000, 'D2'), (3, 'Kelly', 'Rosario', 42689, 'D3');"
  }
]
print(json.dumps(cases))
