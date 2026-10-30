CREATE TABLE Members (
    member_id INT PRIMARY KEY,
    name VARCHAR(30)
);
CREATE TABLE Visits (
    visit_id INT PRIMARY KEY,
    member_id INT,
    visit_date DATE
);
CREATE TABLE Purchases (
    visit_id INT PRIMARY KEY,
    charged_amount INT
);
