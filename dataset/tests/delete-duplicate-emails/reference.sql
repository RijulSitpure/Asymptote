DELETE FROM Person
WHERE id NOT IN (
    SELECT keep_id FROM (
        SELECT MIN(id) AS keep_id
        FROM Person
        WHERE email IS NOT NULL
        GROUP BY email
        UNION ALL
        SELECT id FROM Person WHERE email IS NULL
    ) AS keep_rows
);
