WITH UniqueTransactions AS (
    SELECT DISTINCT customer_id, transaction_date
    FROM Transactions
),
RankedTransactions AS (
    SELECT 
        customer_id,
        transaction_date,
        ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY transaction_date) AS rn
    FROM UniqueTransactions
),
ConsecutiveGroups AS (
    SELECT 
        customer_id,
        DATE_SUB(transaction_date, INTERVAL rn DAY) AS streak_group,
        COUNT(*) AS consecutive_count
    FROM RankedTransactions
    GROUP BY customer_id, streak_group
),
MaxStreaks AS (
    SELECT 
        customer_id,
        MAX(consecutive_count) AS max_streak
    FROM ConsecutiveGroups
    GROUP BY customer_id
),
GlobalMax AS (
    SELECT MAX(max_streak) AS global_max
    FROM MaxStreaks
)
SELECT m.customer_id
FROM MaxStreaks m
JOIN GlobalMax g ON m.max_streak = g.global_max
ORDER BY m.customer_id ASC;
