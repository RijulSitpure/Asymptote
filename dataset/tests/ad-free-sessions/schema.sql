CREATE TABLE IF NOT EXISTS Playback (
    session_id INT PRIMARY KEY,
    customer_id INT,
    start_time INT,
    end_time INT
);
CREATE TABLE IF NOT EXISTS Ads (
    ad_id INT PRIMARY KEY,
    customer_id INT,
    timestamp INT
);