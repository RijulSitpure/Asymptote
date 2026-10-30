SELECT DISTINCT
    f.user1_id,
    f.user2_id
FROM Friendship f
JOIN Listens l1
    ON f.user1_id = l1.user_id
JOIN Listens l2
    ON f.user2_id = l2.user_id
    AND l1.day = l2.day
    AND l1.song_id = l2.song_id
GROUP BY f.user1_id, f.user2_id, l1.day
HAVING COUNT(DISTINCT l1.song_id) >= 3;
