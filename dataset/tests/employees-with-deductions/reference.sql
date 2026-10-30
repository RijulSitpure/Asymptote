SELECT e.employee_id
FROM Employees e
LEFT JOIN Logs l ON e.employee_id = l.employee_id
GROUP BY e.employee_id, e.needed_hours
HAVING COALESCE(SUM(CEIL(TIMESTAMPDIFF(SECOND, l.in_time, l.out_time) / 60.0)), 0) < e.needed_hours * 60;
