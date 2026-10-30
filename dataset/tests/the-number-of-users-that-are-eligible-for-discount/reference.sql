SELECT COUNT(DISTINCT user_id) AS user_cnt
FROM Purchases
WHERE time_stamp BETWEEN '2022-03-08' AND '2022-03-20'
  AND amount >= 1000;