SELECT 
    user_id,
    SUM(token_usage) AS total_usage
FROM UserTokens
GROUP BY user_id
HAVING SUM(token_usage) > 10000
ORDER BY user_id ASC;
