SELECT product_id, 'LC_Store' AS store, LC_Store AS price FROM Products WHERE LC_Store IS NOT NULL
UNION ALL
SELECT product_id, 'Nozama' AS store, Nozama AS price FROM Products WHERE Nozama IS NOT NULL
UNION ALL
SELECT product_id, 'Shop' AS store, Shop AS price FROM Products WHERE Shop IS NOT NULL
UNION ALL
SELECT product_id, 'Souq' AS store, Souq AS price FROM Products WHERE Souq IS NOT NULL
ORDER BY product_id, store;