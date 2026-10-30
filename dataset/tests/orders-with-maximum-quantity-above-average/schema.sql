CREATE TABLE IF NOT EXISTS OrdersDetails (
    order_id INT,
    item_id INT,
    count INT,
    quantity INT,
    PRIMARY KEY (order_id, item_id)
);