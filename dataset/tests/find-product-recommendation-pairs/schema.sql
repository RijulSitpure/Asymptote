CREATE TABLE ProductPurchases (
    user_id INT,
    product_id INT,
    quantity INT
);

CREATE TABLE ProductInfo (
    product_id INT PRIMARY KEY,
    category VARCHAR(255),
    price DECIMAL(10, 2)
);
