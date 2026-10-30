CREATE TABLE Salesperson (
  salesperson_id INT,
  name VARCHAR(50)
);
CREATE TABLE Customer (
  customer_id INT,
  salesperson_id INT
);
CREATE TABLE Sales (
  sale_id INT,
  customer_id INT,
  price INT
);