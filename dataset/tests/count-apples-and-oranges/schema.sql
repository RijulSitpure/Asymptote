CREATE TABLE Boxes (
    box_id INT PRIMARY KEY,
    chest_id INT,
    apple_count INT,
    orange_count INT
);
CREATE TABLE Chests (
    chest_id INT PRIMARY KEY,
    apple_count INT,
    orange_count INT
);
