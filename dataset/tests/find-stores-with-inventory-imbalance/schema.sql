CREATE TABLE stores (
    store_id INT PRIMARY KEY,
    store_name VARCHAR(255),
    location VARCHAR(255)
);

CREATE TABLE inventory (
    store_id INT,
    product_id INT,
    category VARCHAR(255),
    quantity INT,
    PRIMARY KEY (store_id, product_id)
);
