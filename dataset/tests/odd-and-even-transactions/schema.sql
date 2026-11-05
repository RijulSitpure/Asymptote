CREATE TABLE IF NOT EXISTS transactions (
    transaction_id INT PRIMARY KEY,
    amount INT NOT NULL,
    transaction_date DATE NOT NULL
);
