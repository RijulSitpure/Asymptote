SELECT
    product_id,
    SUM(CASE WHEN store = 'LC_Store' THEN price END) AS LC_Store,
    SUM(CASE WHEN store = 'Nozama' THEN price END) AS Nozama,
    SUM(CASE WHEN store = 'Shop' THEN price END) AS Shop,
    SUM(CASE WHEN store = 'Souq' THEN price END) AS Souq
FROM Products
GROUP BY product_id
ORDER BY product_id;