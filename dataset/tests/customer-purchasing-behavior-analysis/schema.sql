CREATE TABLE IF NOT EXISTS Transactions (
    transaction_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    transaction_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS Products (
    product_id INT PRIMARY KEY,
    category VARCHAR(50) NOT NULL
);
