CREATE TABLE IF NOT EXISTS Candidates (
    candidate_id INT NOT NULL,
    skill VARCHAR(50) NOT NULL,
    proficiency INT NOT NULL,
    PRIMARY KEY (candidate_id, skill)
);

CREATE TABLE IF NOT EXISTS Projects (
    project_id INT NOT NULL,
    skill VARCHAR(50) NOT NULL,
    importance INT NOT NULL,
    PRIMARY KEY (project_id, skill)
);
