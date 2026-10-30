WITH YearlyOrders AS (
  SELECT product_id, YEAR(purchase_date) AS yr
  FROM Orders
  GROUP BY product_id, YEAR(purchase_date)
  HAVING COUNT(order_id) >= 3
)
SELECT DISTINCT y1.product_id
FROM YearlyOrders y1
JOIN YearlyOrders y2
  ON y1.product_id = y2.product_id
 AND y2.yr = y1.yr + 1;
