import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Employees VALUES (3, 'Mila', 9, 60301), (12, 'Antonella', NULL, 31000), (13, 'Emery', NULL, 67084), (1, 'Kalel', 11, 21241), (9, 'Mikaela', NULL, 50937), (11, 'Joziah', 6, 28485);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
