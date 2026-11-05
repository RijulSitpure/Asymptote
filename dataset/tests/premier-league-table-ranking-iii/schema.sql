CREATE TABLE SeasonStats (
    season_id INT,
    team_id INT,
    team_name VARCHAR(50),
    matches_played INT,
    wins INT,
    draws INT,
    losses INT,
    goals_for INT,
    goals_against INT,
    PRIMARY KEY (season_id, team_id)
);
