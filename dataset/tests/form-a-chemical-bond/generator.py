import json

cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Elements (symbol, type, electrons) VALUES ('He', 'Noble', 0), ('Na', 'Metal', 1), ('Ca', 'Metal', 2), ('La', 'Metal', 3), ('Cl', 'Nonmetal', 1), ('O', 'Nonmetal', 2), ('N', 'Nonmetal', 3);"
  }
]

if __name__ == "__main__":
    print(json.dumps(cases))
