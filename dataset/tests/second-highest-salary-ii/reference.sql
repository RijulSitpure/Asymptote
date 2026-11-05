WITH RankedEmployees AS (
    SELECT 
        emp_id, 
        dept, 
        DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS rk
    FROM Employees
)
SELECT 
    emp_id, 
    dept
FROM RankedEmployees
WHERE rk = 2
ORDER BY emp_id ASC;
