SELECT 
    c.customer_id,
    c.customer_name,
    COUNT(DISTINCT DATE_FORMAT(p.purchase_date, '%Y-%m')) AS active_months,
    SUM(p.amount) AS total_spent
FROM Customers c
JOIN Purchases p ON c.customer_id = p.customer_id
GROUP BY c.customer_id, c.customer_name
HAVING COUNT(DISTINCT DATE_FORMAT(p.purchase_date, '%Y-%m')) >= 3
   AND SUM(p.amount) >= 500.00
ORDER BY c.customer_id ASC;
