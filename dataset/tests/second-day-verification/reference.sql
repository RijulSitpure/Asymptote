SELECT e.user_id
FROM emails e
JOIN texts t ON e.email_id = t.email_id
WHERE t.signup_action = 'Verified'
  AND DATEDIFF(t.action_date, e.signup_date) = 1
ORDER BY e.user_id ASC;
