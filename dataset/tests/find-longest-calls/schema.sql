CREATE TABLE IF NOT EXISTS Contacts (
    id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);
CREATE TABLE IF NOT EXISTS Calls (
    contact_id INT,
    type VARCHAR(20),
    duration INT
);
