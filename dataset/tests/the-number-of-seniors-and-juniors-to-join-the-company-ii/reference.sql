WITH RankedCandidates AS (
    SELECT
        employee_id,
        experience,
        salary,
        SUM(salary) OVER(PARTITION BY experience ORDER BY salary, employee_id) AS running_salary
    FROM Candidates
),
Seniors AS (
    SELECT employee_id, running_salary
    FROM RankedCandidates
    WHERE experience = 'Senior' AND running_salary <= 70000
),
Juniors AS (
    SELECT employee_id, running_salary
    FROM RankedCandidates
    WHERE experience = 'Junior'
      AND running_salary <= (70000 - COALESCE((SELECT MAX(running_salary) FROM Seniors), 0))
)
SELECT employee_id FROM Seniors
UNION ALL
SELECT employee_id FROM Juniors;
