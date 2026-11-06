import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Enrollments VALUES (1, 101), (1, 102), (1, 103), (2, 101), (2, 102), (3, 101), (3, 103), (4, 101), (4, 102);"
  }
]

print(json.dumps(cases))
