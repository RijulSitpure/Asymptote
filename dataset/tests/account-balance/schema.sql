CREATE TABLE Transactions (
    account_id INT,
    day DATE,
    type VARCHAR(10),
    amount INT,
    PRIMARY KEY (account_id, day)
);
