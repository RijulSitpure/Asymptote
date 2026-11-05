CREATE TABLE IF NOT EXISTS Purchases (
    user_id INT,
    purchase_date DATE,
    amount_spend INT
);
CREATE TABLE IF NOT EXISTS Users (
    user_id INT PRIMARY KEY,
    membership VARCHAR(20)
);
