CREATE TABLE Candidates (
    candidate_id INT PRIMARY KEY,
    name VARCHAR(30),
    years_of_experience INT,
    interview_id INT
);
CREATE TABLE Rounds (
    interview_id INT,
    round_id INT,
    score INT,
    PRIMARY KEY (interview_id, round_id)
);
