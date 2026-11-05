CREATE TABLE students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(255),
    major VARCHAR(255)
);

CREATE TABLE study_sessions (
    session_id INT PRIMARY KEY,
    student_id INT,
    session_date DATE,
    subject VARCHAR(255),
    hours_spent DECIMAL(10, 2)
);
