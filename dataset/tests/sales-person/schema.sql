CREATE TABLE SalesPerson (sales_id int, name varchar(50), salary int, commission_rate int, hire_date varchar(50));
CREATE TABLE Company (com_id int, name varchar(50), city varchar(50));
CREATE TABLE Orders (order_id int, order_date varchar(50), com_id int, sales_id int, amount int);