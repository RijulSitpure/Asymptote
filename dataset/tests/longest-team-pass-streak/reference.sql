WITH RECURSIVE 
TeamPasses AS (
    SELECT 
        Team1.team_name AS team1, 
        Team2.team_name AS team2, 
        Passes.time_stamp
    FROM Passes
    INNER JOIN Teams AS Team1 ON Passes.pass_from = Team1.player_id
    INNER JOIN Teams AS Team2 ON Passes.pass_to = Team2.player_id
), 
Ranked AS (
    SELECT 
        team1, 
        team2, 
        RANK() OVER(PARTITION BY team1 ORDER BY time_stamp) AS `rank`
    FROM TeamPasses
), 
PassStreaks AS (
    SELECT 
        team1, 
        team2, 
        `rank`, 
        CASE WHEN team1 = team2 THEN 1 ELSE 0 END AS streak
    FROM Ranked
    WHERE `rank` = 1
    UNION ALL
    SELECT 
        Ranked.team1, 
        Ranked.team2, 
        Ranked.`rank`, 
        CASE WHEN Ranked.team1 = Ranked.team2 THEN PassStreaks.streak + 1 ELSE 0 END AS streak
    FROM Ranked
    INNER JOIN PassStreaks 
        ON Ranked.`rank` = PassStreaks.`rank` + 1 
       AND Ranked.team1 = PassStreaks.team1
)
SELECT 
    team1 AS team_name, 
    MAX(streak) AS longest_streak
FROM PassStreaks
GROUP BY team1
HAVING longest_streak > 0
ORDER BY team_name ASC;
