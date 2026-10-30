CREATE TABLE IF NOT EXISTS Teams (
    team_id INT PRIMARY KEY,
    team_name VARCHAR(20)
);
CREATE TABLE IF NOT EXISTS Matches (
    home_team_id INT,
    away_team_id INT,
    home_team_goals INT,
    away_team_goals INT,
    PRIMARY KEY (home_team_id, away_team_id)
);