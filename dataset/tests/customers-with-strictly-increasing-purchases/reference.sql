WITH YearlyOrders AS (
    SELECT 
        customer_id, 
        YEAR(order_date) AS year, 
        SUM(price) AS price
    FROM Orders
    GROUP BY customer_id, YEAR(order_date)
)
SELECT CurrYear.customer_id
FROM YearlyOrders AS CurrYear
LEFT JOIN YearlyOrders AS NextYear 
  ON CurrYear.customer_id = NextYear.customer_id 
 AND CurrYear.year + 1 = NextYear.year 
 AND CurrYear.price < NextYear.price
GROUP BY CurrYear.customer_id
HAVING COUNT(*) - COUNT(NextYear.customer_id) = 1;
