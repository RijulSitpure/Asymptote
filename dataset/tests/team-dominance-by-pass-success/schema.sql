CREATE TABLE Teams (
    player_id INT PRIMARY KEY,
    team_name VARCHAR(50)
);
CREATE TABLE Passes (
    pass_from INT,
    time_stamp VARCHAR(5),
    pass_to INT
);
