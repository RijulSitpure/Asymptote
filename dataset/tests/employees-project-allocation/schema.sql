CREATE TABLE IF NOT EXISTS Project (
    project_id INT,
    employee_id INT,
    workload INT
);
CREATE TABLE IF NOT EXISTS Employees (
    employee_id INT,
    name VARCHAR(50),
    team VARCHAR(50)
);
