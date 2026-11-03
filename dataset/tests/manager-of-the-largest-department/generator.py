import json

inserts = "INSERT INTO Employees VALUES (1, 'Alice', 101, 'Manager'), (2, 'Bob', 101, 'Engineer'), (3, 'Charlie', 102, 'Manager'), (4, 'David', 101, 'Engineer');"

print(json.dumps([{'name': 'case_1', 'inserts': inserts}]))
