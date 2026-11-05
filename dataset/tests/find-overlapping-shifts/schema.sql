CREATE TABLE IF NOT EXISTS EmployeeShifts (
    employee_id INT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    PRIMARY KEY (employee_id, start_time)
);
