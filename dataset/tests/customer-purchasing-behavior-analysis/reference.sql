WITH customer_metrics AS (
    SELECT
        t.customer_id,
        ROUND(SUM(t.amount), 2) AS total_amount,
        COUNT(t.transaction_id) AS transaction_count,
        COUNT(DISTINCT p.category) AS unique_categories,
        ROUND(AVG(t.amount), 2) AS avg_transaction_amount,
        ROUND((COUNT(t.transaction_id) * 10) + (SUM(t.amount) / 100), 2) AS loyalty_score
    FROM Transactions t
    JOIN Products p ON t.product_id = p.product_id
    GROUP BY t.customer_id
),
category_frequency AS (
    SELECT
        t.customer_id,
        p.category,
        COUNT(t.transaction_id) AS cat_count,
        MIN(t.transaction_date) AS earliest_date,
        ROW_NUMBER() OVER (
            PARTITION BY t.customer_id
            ORDER BY COUNT(t.transaction_id) DESC, MIN(t.transaction_date) ASC
        ) AS rn
    FROM Transactions t
    JOIN Products p ON t.product_id = p.product_id
    GROUP BY t.customer_id, p.category
)
SELECT
    m.customer_id,
    m.total_amount,
    m.transaction_count,
    m.unique_categories,
    m.avg_transaction_amount,
    c.category AS top_category,
    m.loyalty_score
FROM customer_metrics m
JOIN category_frequency c ON m.customer_id = c.customer_id AND c.rn = 1
ORDER BY m.loyalty_score DESC, m.customer_id ASC;
