import json

inserts = [
    "INSERT INTO Products (product_id, category) VALUES (1, 'Electronics');",
    "INSERT INTO Products (product_id, category) VALUES (2, 'Books');",
    "INSERT INTO Products (product_id, category) VALUES (3, 'Clothing');",
    "INSERT INTO Transactions (transaction_id, customer_id, product_id, amount, transaction_date) VALUES (101, 1, 1, 100.00, '2023-01-01');",
    "INSERT INTO Transactions (transaction_id, customer_id, product_id, amount, transaction_date) VALUES (102, 1, 2, 50.00, '2023-01-05');",
    "INSERT INTO Transactions (transaction_id, customer_id, product_id, amount, transaction_date) VALUES (103, 1, 1, 120.00, '2023-01-10');",
    "INSERT INTO Transactions (transaction_id, customer_id, product_id, amount, transaction_date) VALUES (104, 2, 2, 30.00, '2023-02-01');",
    "INSERT INTO Transactions (transaction_id, customer_id, product_id, amount, transaction_date) VALUES (105, 2, 3, 40.00, '2023-02-05');"
]

print(json.dumps([{"name": "case_1", "inserts": inserts}]))
