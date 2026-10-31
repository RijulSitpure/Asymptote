SELECT DISTINCT u1.user_id FROM Users u1 JOIN Users u2 ON u1.user_id = u2.user_id AND u1.created_at < u2.created_at AND DATEDIFF(u2.created_at, u1.created_at) <= 7 ORDER BY u1.user_id ASC;
