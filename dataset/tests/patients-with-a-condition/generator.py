import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Patients VALUES (1, 'Daniel', 'YFEV COUGH'), (2, 'Alice', ''), (3, 'Bob', 'DIAB100 MYOP'), (4, 'George', 'ACNE DIAB100'), (5, 'Alain', 'COUGH SADIAB100');"
  }
]
print(json.dumps(cases))
