CREATE TABLE library_books (
    book_id INT PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    total_copies INT
);

CREATE TABLE borrowing_records (
    record_id INT PRIMARY KEY,
    book_id INT,
    borrower_name VARCHAR(255),
    borrow_date DATE,
    return_date DATE
);
