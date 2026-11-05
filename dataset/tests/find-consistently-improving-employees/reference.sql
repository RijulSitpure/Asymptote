WITH ranked_reviews AS (
    SELECT 
        employee_id,
        review_date,
        rating,
        ROW_NUMBER() OVER (PARTITION BY employee_id ORDER BY review_date DESC) AS rn
    FROM performance_reviews
),
recent_three AS (
    SELECT 
        employee_id,
        MAX(CASE WHEN rn = 1 THEN rating END) AS r1,
        MAX(CASE WHEN rn = 2 THEN rating END) AS r2,
        MAX(CASE WHEN rn = 3 THEN rating END) AS r3,
        COUNT(rn) AS cnt
    FROM ranked_reviews
    WHERE rn <= 3
    GROUP BY employee_id
)
SELECT 
    e.employee_id,
    e.name,
    e.department,
    r.r1 AS latest_rating
FROM recent_three r
JOIN employees e ON r.employee_id = e.employee_id
WHERE r.cnt = 3 AND r.r3 < r.r2 AND r.r2 < r.r1
ORDER BY e.employee_id ASC;
