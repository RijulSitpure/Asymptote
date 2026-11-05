CREATE TABLE IF NOT EXISTS user_transactions (
    transaction_id INT,
    product_id INT,
    spend DECIMAL(10, 2),
    transaction_date DATETIME
);
