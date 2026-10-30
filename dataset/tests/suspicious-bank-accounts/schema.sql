CREATE TABLE IF NOT EXISTS Accounts (
    account_id INT PRIMARY KEY,
    max_income INT
);
CREATE TABLE IF NOT EXISTS Transactions (
    transaction_id INT PRIMARY KEY,
    account_id INT,
    type ENUM('Credited', 'Debited'),
    amount INT,
    day DATETIME
);