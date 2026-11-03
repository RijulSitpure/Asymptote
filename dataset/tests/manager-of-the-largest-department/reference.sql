WITH DepartmentCount AS (
    SELECT 
        dep_id, 
        COUNT(*) AS cnt
    FROM Employees
    GROUP BY dep_id
)
SELECT 
    e.emp_name AS manager_name, 
    e.dep_id
FROM DepartmentCount dc
JOIN Employees e 
    ON dc.dep_id = e.dep_id 
    AND e.position = 'Manager'
WHERE dc.cnt = (SELECT MAX(cnt) FROM DepartmentCount)
ORDER BY e.dep_id ASC;
