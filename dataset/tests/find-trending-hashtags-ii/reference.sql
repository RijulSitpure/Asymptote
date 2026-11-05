WITH RECURSIVE FebruaryTweets AS (
    SELECT * 
    FROM Tweets 
    WHERE tweet_date BETWEEN '2024-02-01' AND '2024-02-29'
),
HashtagToTweet AS (
    SELECT 
        REGEXP_SUBSTR(tweet, '#[^[:space:]]+') AS hashtag, 
        REGEXP_REPLACE(tweet, '#[^[:space:]]+', '', 1, 1) AS remaining_tweet 
    FROM FebruaryTweets
    WHERE tweet LIKE '%#%'
    
    UNION ALL
    
    SELECT 
        REGEXP_SUBSTR(remaining_tweet, '#[^[:space:]]+') AS hashtag, 
        REGEXP_REPLACE(remaining_tweet, '#[^[:space:]]+', '', 1, 1) AS remaining_tweet 
    FROM HashtagToTweet 
    WHERE remaining_tweet LIKE '%#%'
)
SELECT 
    hashtag, 
    COUNT(*) AS count 
FROM HashtagToTweet 
WHERE hashtag IS NOT NULL
GROUP BY hashtag 
ORDER BY count DESC, hashtag DESC 
LIMIT 3;
