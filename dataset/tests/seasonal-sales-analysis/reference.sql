WITH seasonal_sales AS (
    SELECT 
        s.sale_id,
        s.product_id,
        p.category,
        s.quantity,
        s.price,
        CASE 
            WHEN MONTH(s.sale_date) IN (12, 1, 2) THEN 'Winter'
            WHEN MONTH(s.sale_date) IN (3, 4, 5) THEN 'Spring'
            WHEN MONTH(s.sale_date) IN (6, 7, 8) THEN 'Summer'
            ELSE 'Fall'
        END AS season
    FROM sales s
    JOIN products p ON s.product_id = p.product_id
),
aggregated_sales AS (
    SELECT 
        season,
        category,
        SUM(quantity) AS total_quantity,
        SUM(quantity * price) AS total_revenue
    FROM seasonal_sales
    GROUP BY season, category
),
ranked_categories AS (
    SELECT 
        season,
        category,
        total_quantity,
        total_revenue,
        ROW_NUMBER() OVER (
            PARTITION BY season 
            ORDER BY total_quantity DESC, total_revenue DESC, category ASC
        ) AS rn
    FROM aggregated_sales
)
SELECT 
    season,
    category,
    total_quantity,
    total_revenue
FROM ranked_categories
WHERE rn = 1
ORDER BY season ASC;
