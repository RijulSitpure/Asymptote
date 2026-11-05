CREATE TABLE IF NOT EXISTS Sessions (
    session_id INT PRIMARY KEY,
    user_id INT,
    start_time DATETIME,
    end_time DATETIME,
    activity_count INT
);
