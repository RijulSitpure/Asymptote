CREATE TABLE Product (
    product_id INT PRIMARY KEY,
    name VARCHAR(50)
);
CREATE TABLE Invoice (
    invoice_id INT PRIMARY KEY,
    product_id INT,
    rest INT,
    paid INT,
    canceled INT,
    refunded INT
);
