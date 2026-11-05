CREATE TABLE Customers (customer_id INT PRIMARY KEY, name VARCHAR(50));
CREATE TABLE Subscriptions (subscription_id INT PRIMARY KEY, customer_id INT, start_date DATE, end_date DATE, auto_renew INT);