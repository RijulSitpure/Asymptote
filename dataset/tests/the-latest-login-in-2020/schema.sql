CREATE TABLE IF NOT EXISTS Logins (
    user_id INT,
    time_stamp DATETIME,
    PRIMARY KEY (user_id, time_stamp)
);