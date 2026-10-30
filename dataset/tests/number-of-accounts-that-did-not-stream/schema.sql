CREATE TABLE Subscriptions (
    account_id INT PRIMARY KEY,
    start_date DATE,
    end_date DATE
);
CREATE TABLE Streams (
    session_id INT PRIMARY KEY,
    account_id INT,
    stream_date DATE
);
