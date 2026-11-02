import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Employees VALUES (2, 'Crew'), (4, 'Haven'), (5, 'Kristian'); INSERT INTO Salaries VALUES (5, 76071), (1, 22517), (4, 63539);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
