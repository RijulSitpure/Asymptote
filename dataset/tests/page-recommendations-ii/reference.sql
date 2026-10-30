WITH AllFriends AS (
    SELECT user1_id AS user_id, user2_id AS friend_id FROM Friendship
    UNION
    SELECT user2_id AS user_id, user1_id AS friend_id FROM Friendship
)
SELECT
    f.user_id,
    l.page_id,
    COUNT(DISTINCT f.friend_id) AS friends_likes
FROM AllFriends f
JOIN Likes l ON f.friend_id = l.user_id
LEFT JOIN Likes self ON f.user_id = self.user_id AND l.page_id = self.page_id
WHERE self.page_id IS NULL
GROUP BY f.user_id, l.page_id;