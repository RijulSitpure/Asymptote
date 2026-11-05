SELECT 
    c.customer_id,
    c.name,
    SUM(o.amount) AS total_golden_spent
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
WHERE HOUR(o.order_timestamp) = 18
GROUP BY c.customer_id, c.name
HAVING SUM(o.amount) >= 100
ORDER BY c.customer_id ASC;