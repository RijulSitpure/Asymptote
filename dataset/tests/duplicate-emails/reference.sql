SELECT DISTINCT p1.email AS Email
FROM Person p1
WHERE EXISTS (
    SELECT 1 FROM Person p2 WHERE p2.email = p1.email AND p2.id <> p1.id
);
