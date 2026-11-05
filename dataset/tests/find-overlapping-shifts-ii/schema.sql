CREATE TABLE IF NOT EXISTS EmployeeShifts (
    employee_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    PRIMARY KEY (employee_id, start_time)
);
