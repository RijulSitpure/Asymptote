WITH RankedTransactions AS (
    SELECT 
        user_id,
        spend AS third_transaction_spend,
        transaction_date AS third_transaction_date,
        ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY transaction_date) AS rn,
        LAG(spend, 1) OVER (PARTITION BY user_id ORDER BY transaction_date) AS prev1,
        LAG(spend, 2) OVER (PARTITION BY user_id ORDER BY transaction_date) AS prev2
    FROM Transactions
)
SELECT 
    user_id,
    third_transaction_spend,
    third_transaction_date
FROM RankedTransactions
WHERE rn = 3 
  AND third_transaction_spend > prev1 
  AND third_transaction_spend > prev2
ORDER BY user_id ASC;
