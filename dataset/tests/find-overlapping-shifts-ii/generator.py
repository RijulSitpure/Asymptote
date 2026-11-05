import json

inserts = [
    "INSERT INTO EmployeeShifts (employee_id, start_time, end_time) VALUES (1, '2023-10-01 08:00:00', '2023-10-01 12:00:00');",
    "INSERT INTO EmployeeShifts (employee_id, start_time, end_time) VALUES (1, '2023-10-01 10:00:00', '2023-10-01 14:00:00');",
    "INSERT INTO EmployeeShifts (employee_id, start_time, end_time) VALUES (1, '2023-10-01 11:00:00', '2023-10-01 15:00:00');",
    "INSERT INTO EmployeeShifts (employee_id, start_time, end_time) VALUES (2, '2023-10-01 09:00:00', '2023-10-01 17:00:00');"
]

print(json.dumps([{"name": "case_1", "inserts": inserts}]))
