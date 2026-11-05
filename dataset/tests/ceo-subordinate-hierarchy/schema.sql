CREATE TABLE IF NOT EXISTS Employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50) NOT NULL,
    manager_id INT,
    salary INT NOT NULL
);
