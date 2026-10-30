CREATE TABLE IF NOT EXISTS Employee (
    employee_id INT,
    department_id INT,
    primary_flag ENUM('Y', 'N'),
    PRIMARY KEY (employee_id, department_id)
);