CREATE TABLE IF NOT EXISTS students (
    student_id INT,
    name VARCHAR(50),
    major VARCHAR(50)
);
CREATE TABLE IF NOT EXISTS courses (
    course_id INT,
    name VARCHAR(50),
    credits INT,
    major VARCHAR(50),
    mandatory VARCHAR(10)
);
CREATE TABLE IF NOT EXISTS enrollments (
    student_id INT,
    course_id INT,
    semester VARCHAR(20),
    grade VARCHAR(2),
    gpa DECIMAL(3, 2)
);
