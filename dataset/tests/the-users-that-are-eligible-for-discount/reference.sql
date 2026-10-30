SELECT DISTINCT user_id
FROM Purchases
WHERE time_stamp BETWEEN '2022-03-08' AND '2022-03-20'
  AND amount >= 1000
ORDER BY user_id;