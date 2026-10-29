import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Scores VALUES ('Aron', 'F', '2020-01-01', 17), ('Alice', 'F', '2020-01-07', 23), ('Bajrang', 'M', '2020-01-07', 7), ('Khali', 'M', '2019-12-25', 11), ('Slaman', 'M', '2019-12-30', 13), ('Joe', 'M', '2019-12-31', 3), ('Jose', 'M', '2019-12-18', 2), ('Priya', 'F', '2019-12-31', 18), ('Priyanka', 'F', '2019-12-30', 17);"
  }
]
print(json.dumps(cases))
