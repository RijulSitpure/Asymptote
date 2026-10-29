import json
cases = [
  {
    "name": "case_1",
    "inserts": "INSERT INTO Salaries VALUES (1, 1, 'Tony', 2000), (1, 2, 'Pronub', 21300), (1, 3, 'Tyrone', 7000), (2, 1, 'Pam', 300), (2, 7, 'Bassem', 450), (2, 9, 'Hermione', 700), (3, 7, 'Bocaben', 100), (3, 2, 'Ognjen', 2200), (3, 13, 'Nyancat', 3300), (3, 15, 'Morninngcat', 7777);"
  }
]
print(json.dumps(cases))
