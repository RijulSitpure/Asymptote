CREATE TABLE Signups (
    user_id INT PRIMARY KEY,
    time_stamp DATETIME
);
CREATE TABLE Confirmations (
    user_id INT,
    time_stamp DATETIME,
    action VARCHAR(20)
);
