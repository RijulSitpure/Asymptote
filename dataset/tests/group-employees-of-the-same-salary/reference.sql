WITH ValidSalaries AS (
    SELECT salary
    FROM Employees
    GROUP BY salary
    HAVING COUNT(*) >= 2
),
EligibleEmployees AS (
    SELECT
        e.employee_id,
        e.name,
        e.salary,
        DENSE_RANK() OVER (ORDER BY e.salary ASC) AS team_id
    FROM Employees e
    JOIN ValidSalaries v ON e.salary = v.salary
)
SELECT employee_id, name, salary, team_id
FROM EligibleEmployees
ORDER BY team_id ASC, employee_id ASC;