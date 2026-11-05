import json

inserts = [
    "INSERT INTO Employees (employee_id, employee_name, manager_id, salary) VALUES (1, 'Alice', NULL, 150000);",
    "INSERT INTO Employees (employee_id, employee_name, manager_id, salary) VALUES (2, 'Bob', 1, 120000);",
    "INSERT INTO Employees (employee_id, employee_name, manager_id, salary) VALUES (3, 'Charlie', 1, 110000);",
    "INSERT INTO Employees (employee_id, employee_name, manager_id, salary) VALUES (4, 'David', 2, 90000);",
    "INSERT INTO Employees (employee_id, employee_name, manager_id, salary) VALUES (5, 'Eve', 2, 85000);",
    "INSERT INTO Employees (employee_id, employee_name, manager_id, salary) VALUES (6, 'Frank', 3, 80000);"
]

print(json.dumps([{"name": "case_1", "inserts": inserts}]))
