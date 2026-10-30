import json

cases = [
  {
    "name": "sample",
    "inserts": "INSERT INTO Employees VALUES (1, 1), (2, 3), (3, 2); INSERT INTO Logs VALUES (1, '2022-10-01 08:30:00', '2022-10-01 09:30:00'), (2, '2022-10-01 08:30:00', '2022-10-01 10:00:00');"
  }
]
print(json.dumps(cases))
