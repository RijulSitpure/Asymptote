CREATE TABLE IF NOT EXISTS Users (
    seller_id INT PRIMARY KEY,
    join_date DATE,
    favorite_brand VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Orders (
    order_id INT PRIMARY KEY,
    order_date DATE,
    item_id INT,
    seller_id INT
);

CREATE TABLE IF NOT EXISTS Items (
    item_id INT PRIMARY KEY,
    item_brand VARCHAR(50)
);
