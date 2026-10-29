SELECT ROUND(IFNULL((SELECT COUNT(DISTINCT requester_id, accepter_id) FROM RequestAccepted) / NULLIF((SELECT COUNT(DISTINCT sender_id, send_to_id) FROM FriendRequest), 0), 0.0), 2) AS accept_rate;
