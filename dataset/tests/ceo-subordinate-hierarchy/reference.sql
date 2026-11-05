WITH RECURSIVE Subordinates AS (
    SELECT
        e.employee_id AS subordinate_id,
        e.employee_name AS subordinate_name,
        1 AS hierarchy_level,
        e.salary - ceo.salary AS salary_difference
    FROM Employees e
    JOIN Employees ceo ON ceo.manager_id IS NULL
    WHERE e.manager_id = ceo.employee_id
    
    UNION ALL
    
    SELECT
        e.employee_id,
        e.employee_name,
        s.hierarchy_level + 1,
        e.salary - ceo.salary
    FROM Employees e
    JOIN Subordinates s ON e.manager_id = s.subordinate_id
    JOIN Employees ceo ON ceo.manager_id IS NULL
)
SELECT
    subordinate_id,
    subordinate_name,
    hierarchy_level,
    salary_difference
FROM Subordinates
ORDER BY hierarchy_level ASC, subordinate_id ASC;
