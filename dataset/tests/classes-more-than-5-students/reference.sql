SELECT DISTINCT c1.class
FROM Courses c1
WHERE (
    SELECT COUNT(c2.student)
    FROM Courses c2
    WHERE c2.class = c1.class
) >= 5;
