import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Students VALUES (1, 'Alice'), (2, 'Bob'), (13, 'John'), (6, 'Alex');\nINSERT INTO Subjects VALUES ('Math'), ('Physics'), ('Programming');\nINSERT INTO Examinations VALUES (1, 'Math'), (1, 'Physics'), (1, 'Programming'), (2, 'Programming'), (1, 'Physics'), (1, 'Math'), (13, 'Math'), (13, 'Programming'), (13, 'Physics'), (2, 'Math'), (1, 'Math');"
  }
]
print(json.dumps(cases))
