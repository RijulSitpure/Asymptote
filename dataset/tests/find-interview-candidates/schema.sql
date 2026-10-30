CREATE TABLE IF NOT EXISTS Contests (
    contest_id INT PRIMARY KEY,
    gold_medal INT,
    silver_medal INT,
    bronze_medal INT
);
CREATE TABLE IF NOT EXISTS Users (
    user_id INT PRIMARY KEY,
    mail VARCHAR(50),
    name VARCHAR(30)
);