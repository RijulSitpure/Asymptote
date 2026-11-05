WITH YearlySpend AS (
    SELECT 
        YEAR(transaction_date) AS year,
        product_id,
        SUM(spend) AS curr_year_spend
    FROM user_transactions
    GROUP BY product_id, YEAR(transaction_date)
)
SELECT 
    year,
    product_id,
    curr_year_spend,
    LAG(curr_year_spend, 1) OVER (PARTITION BY product_id ORDER BY year ASC) AS prev_year_spend,
    ROUND(
        (curr_year_spend - LAG(curr_year_spend, 1) OVER (PARTITION BY product_id ORDER BY year ASC)) * 100.0 
        / LAG(curr_year_spend, 1) OVER (PARTITION BY product_id ORDER BY year ASC),
        2
    ) AS yoy_rate
FROM YearlySpend
ORDER BY product_id ASC, year ASC;
