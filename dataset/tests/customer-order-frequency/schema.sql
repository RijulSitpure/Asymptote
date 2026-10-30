CREATE TABLE Customers (customer_id int, name varchar(30), country varchar(30));
CREATE TABLE Product (product_id int, description varchar(255), price int);
CREATE TABLE Orders (order_id int, customer_id int, product_id int, order_date date, quantity int);
