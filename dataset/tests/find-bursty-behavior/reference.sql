WITH SevenDayPostCounts AS (
    SELECT 
        p1.user_id, 
        COUNT(*) AS post_count 
    FROM Posts p1 
    INNER JOIN Posts p2 
        ON p1.user_id = p2.user_id
    WHERE p2.post_date BETWEEN p1.post_date AND DATE_ADD(p1.post_date, INTERVAL 6 DAY)
      AND p1.post_date BETWEEN '2024-02-01' AND '2024-02-28'
      AND p2.post_date BETWEEN '2024-02-01' AND '2024-02-28'
    GROUP BY p1.user_id, p1.post_id
), 
AverageWeeklyPosts AS (
    SELECT 
        user_id, 
        COUNT(*) / 4.0 AS avg_weekly_posts 
    FROM Posts 
    WHERE post_date BETWEEN '2024-02-01' AND '2024-02-28' 
    GROUP BY user_id
) 
SELECT 
    SevenDayPostCounts.user_id, 
    MAX(SevenDayPostCounts.post_count) AS max_7day_posts, 
    AverageWeeklyPosts.avg_weekly_posts 
FROM SevenDayPostCounts 
INNER JOIN AverageWeeklyPosts 
    ON SevenDayPostCounts.user_id = AverageWeeklyPosts.user_id 
GROUP BY SevenDayPostCounts.user_id, AverageWeeklyPosts.avg_weekly_posts 
HAVING max_7day_posts >= avg_weekly_posts * 2 
ORDER BY user_id ASC;
