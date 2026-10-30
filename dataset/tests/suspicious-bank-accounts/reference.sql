WITH MonthlyIncome AS (
    SELECT
        t.account_id,
        DATE_FORMAT(t.day, '%Y%m') AS ym,
        PERIOD_DIFF(DATE_FORMAT(t.day, '%Y%m'), '202001') AS m_num,
        SUM(t.amount) AS total_income,
        a.max_income
    FROM Transactions t
    JOIN Accounts a ON t.account_id = a.account_id
    WHERE t.type = 'Credited'
    GROUP BY t.account_id, DATE_FORMAT(t.day, '%Y%m'), PERIOD_DIFF(DATE_FORMAT(t.day, '%Y%m'), '202001'), a.max_income
    HAVING total_income > a.max_income
),
Ranked AS (
    SELECT
        account_id,
        m_num - ROW_NUMBER() OVER (PARTITION BY account_id ORDER BY m_num) AS grp
    FROM MonthlyIncome
)
SELECT DISTINCT account_id
FROM Ranked
GROUP BY account_id, grp
HAVING COUNT(*) >= 2
ORDER BY account_id ASC;