SELECT 
    c.customer_id,
    c.name,
    s.end_date
FROM Customers c
JOIN Subscriptions s ON c.customer_id = s.customer_id
WHERE s.auto_renew = 0
  AND s.end_date BETWEEN '2026-11-01' AND '2026-11-30'
ORDER BY c.customer_id ASC;