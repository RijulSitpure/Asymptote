CREATE TABLE IF NOT EXISTS Players (
    player_id INT PRIMARY KEY,
    player_name VARCHAR(50)
);
CREATE TABLE IF NOT EXISTS Championships (
    year INT PRIMARY KEY,
    Wimbledon INT,
    Fr_open INT,
    US_open INT,
    Au_open INT
);