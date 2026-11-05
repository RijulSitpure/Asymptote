SELECT 
    user_id,
    MIN(sentiment) AS sentiment,
    COUNT(post_id) AS post_count
FROM UserPosts
GROUP BY user_id
HAVING COUNT(post_id) >= 3 
   AND COUNT(DISTINCT sentiment) = 1
ORDER BY user_id ASC;
