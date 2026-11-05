WITH T AS (
    SELECT
        p.employee_id,
        p.project_id,
        e.name AS employee_name,
        p.workload AS project_workload,
        AVG(p.workload) OVER (PARTITION BY e.team) AS avg_workload
    FROM Project AS p
    JOIN Employees AS e ON p.employee_id = e.employee_id
)
SELECT
    employee_id,
    project_id,
    employee_name,
    project_workload
FROM T
WHERE project_workload > avg_workload
ORDER BY employee_id, project_id;
