SELECT e.name AS Employee
FROM Employee e
WHERE e.managerId IS NOT NULL
  AND e.salary > (SELECT m.salary FROM Employee m WHERE m.id = e.managerId);
