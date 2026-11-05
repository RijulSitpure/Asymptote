CREATE TABLE IF NOT EXISTS Books (
    book_id INT PRIMARY KEY,
    title VARCHAR(100),
    author VARCHAR(100),
    genre VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Reviews (
    review_id INT PRIMARY KEY,
    book_id INT,
    rating INT,
    review_date DATE
);
