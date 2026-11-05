WITH store_category_quantities AS (
    SELECT 
        store_id,
        category,
        SUM(quantity) AS cat_qty
    FROM inventory
    GROUP BY store_id, category
),
store_imbalances AS (
    SELECT 
        store_id,
        MAX(cat_qty) AS max_category_qty,
        MIN(cat_qty) AS min_category_qty,
        MAX(cat_qty) - MIN(cat_qty) AS imbalance
    FROM store_category_quantities
    GROUP BY store_id
    HAVING COUNT(category) >= 2 AND (MAX(cat_qty) - MIN(cat_qty)) >= 50
)
SELECT 
    s.store_id,
    s.store_name,
    s.location,
    i.max_category_qty,
    i.min_category_qty,
    i.imbalance
FROM store_imbalances i
JOIN stores s ON i.store_id = s.store_id
ORDER BY i.imbalance DESC, s.store_id ASC;
