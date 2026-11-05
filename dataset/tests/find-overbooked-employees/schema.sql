CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(255),
    department VARCHAR(255)
);

CREATE TABLE meetings (
    meeting_id INT PRIMARY KEY,
    employee_id INT,
    meeting_date DATE,
    start_time TIME,
    end_time TIME
);
