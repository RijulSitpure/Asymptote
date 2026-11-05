CREATE TABLE Scores (
    student_id INT,
    subject VARCHAR(50),
    score INT,
    exam_date VARCHAR(20),
    PRIMARY KEY (student_id, subject, exam_date)
);
