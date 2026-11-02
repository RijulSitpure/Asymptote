import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Salary (id, name, sex, salary) VALUES (1, 'A', 'm', 2500), (2, 'B', 'f', 1500), (3, 'C', 'm', 5500), (4, 'D', 'f', 500);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
