SELECT DISTINCT p1.user_id
FROM Purchases p1
JOIN Purchases p2
  ON p1.user_id = p2.user_id
 AND p1.purchase_id != p2.purchase_id
 AND p2.purchase_date >= p1.purchase_date
 AND DATEDIFF(p2.purchase_date, p1.purchase_date) <= 7
ORDER BY p1.user_id;