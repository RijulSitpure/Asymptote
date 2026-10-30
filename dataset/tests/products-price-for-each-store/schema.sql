CREATE TABLE IF NOT EXISTS Products (
    product_id INT,
    store ENUM('store1', 'store2', 'store3'),
    price INT,
    PRIMARY KEY (product_id, store)
);