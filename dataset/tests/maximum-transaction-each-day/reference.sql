WITH Ranked AS (
    SELECT
        transaction_id,
        DENSE_RANK() OVER (PARTITION BY DATE(day) ORDER BY amount DESC) AS rk
    FROM Transactions
)
SELECT transaction_id
FROM Ranked
WHERE rk = 1
ORDER BY transaction_id ASC;