CREATE TABLE IF NOT EXISTS TeamStats (
    team_id INT PRIMARY KEY,
    team_name VARCHAR(50) NOT NULL,
    matches_played INT NOT NULL,
    wins INT NOT NULL,
    draws INT NOT NULL,
    losses INT NOT NULL
);
