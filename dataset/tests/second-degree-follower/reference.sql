SELECT followee AS follower, COUNT(DISTINCT follower) AS num FROM Follow WHERE followee IN (SELECT follower FROM Follow) GROUP BY followee ORDER BY follower ASC;
