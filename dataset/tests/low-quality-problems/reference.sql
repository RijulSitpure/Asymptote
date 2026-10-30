SELECT
    problem_id
FROM Problems
WHERE likes * 1.0 / (likes + dislikes) < 0.60
ORDER BY problem_id ASC;
