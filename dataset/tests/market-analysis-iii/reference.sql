WITH RankedSellers AS (
    SELECT 
        o.seller_id,
        COUNT(DISTINCT o.item_id) AS num_items,
        DENSE_RANK() OVER (ORDER BY COUNT(DISTINCT o.item_id) DESC) AS rk
    FROM Orders o
    JOIN Users u ON o.seller_id = u.seller_id
    JOIN Items i ON o.item_id = i.item_id
    WHERE i.item_brand <> u.favorite_brand
    GROUP BY o.seller_id
)
SELECT 
    seller_id,
    num_items
FROM RankedSellers
WHERE rk = 1
ORDER BY seller_id ASC;
