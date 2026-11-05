SELECT 
    T1.team_name,
    CASE WHEN Passes.time_stamp <= '45:00' THEN 1 ELSE 2 END AS half_number,
    SUM(CASE WHEN T1.team_name = T2.team_name THEN 1 ELSE -1 END) AS dominance
FROM Passes
JOIN Teams T1 ON Passes.pass_from = T1.player_id
JOIN Teams T2 ON Passes.pass_to = T2.player_id
GROUP BY T1.team_name, half_number
ORDER BY T1.team_name ASC, half_number ASC;
