import json

inserts = [
    "INSERT INTO EmployeeShifts (employee_id, start_time, end_time) VALUES (1, '08:00:00', '12:00:00');",
    "INSERT INTO EmployeeShifts (employee_id, start_time, end_time) VALUES (1, '11:00:00', '15:00:00');",
    "INSERT INTO EmployeeShifts (employee_id, start_time, end_time) VALUES (1, '14:00:00', '18:00:00');",
    "INSERT INTO EmployeeShifts (employee_id, start_time, end_time) VALUES (2, '09:00:00', '17:00:00');",
    "INSERT INTO EmployeeShifts (employee_id, start_time, end_time) VALUES (3, '10:00:00', '14:00:00');",
    "INSERT INTO EmployeeShifts (employee_id, start_time, end_time) VALUES (3, '13:00:00', '17:00:00');"
]

print(json.dumps([{"name": "case_1", "inserts": inserts}]))
