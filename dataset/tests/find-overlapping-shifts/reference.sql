SELECT 
    Shift1.employee_id, 
    COUNT(*) AS overlapping_shifts 
FROM EmployeeShifts AS Shift1
INNER JOIN EmployeeShifts AS Shift2 
    ON Shift1.employee_id = Shift2.employee_id
    AND Shift1.start_time < Shift2.start_time 
    AND Shift2.start_time < Shift1.end_time
GROUP BY Shift1.employee_id
ORDER BY Shift1.employee_id ASC;
