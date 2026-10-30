SELECT order_id
FROM OrdersDetails
GROUP BY order_id
HAVING MAX(quantity) > (
    SELECT MAX(avg_qty)
    FROM (
        SELECT AVG(quantity) AS avg_qty
        FROM OrdersDetails
        GROUP BY order_id
    ) t
);