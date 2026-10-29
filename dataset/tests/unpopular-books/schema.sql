CREATE TABLE Books (book_id int, name varchar(50), available_from date);
CREATE TABLE Orders (order_id int, book_id int, quantity int, dispatch_date date);
