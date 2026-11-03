CREATE TABLE IF NOT EXISTS Sessions (
    user_id INT,
    session_start DATETIME,
    session_end DATETIME,
    session_id INT,
    session_type VARCHAR(50)
);
