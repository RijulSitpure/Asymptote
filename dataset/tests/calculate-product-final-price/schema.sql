CREATE TABLE Products (
    product_id INT PRIMARY KEY,
    category VARCHAR(50),
    price DECIMAL(10, 2)
);

CREATE TABLE Discounts (
    category VARCHAR(50) PRIMARY KEY,
    discount INT
);
