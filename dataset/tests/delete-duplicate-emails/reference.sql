SELECT MIN(id) AS id, email
FROM Person
GROUP BY email
ORDER BY id;
