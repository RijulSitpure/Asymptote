WITH RankedMatches AS (
    SELECT 
        player_id,
        match_day,
        result,
        ROW_NUMBER() OVER (PARTITION BY player_id ORDER BY match_day) AS overall_rn
    FROM Matches
),
WinMatches AS (
    SELECT 
        player_id,
        overall_rn,
        ROW_NUMBER() OVER (PARTITION BY player_id ORDER BY match_day) AS win_rn
    FROM RankedMatches
    WHERE result = 'Win'
),
Streaks AS (
    SELECT 
        player_id,
        COUNT(*) AS streak
    FROM WinMatches
    GROUP BY player_id, (overall_rn - win_rn)
),
MaxStreaks AS (
    SELECT 
        player_id,
        MAX(streak) AS longest_streak
    FROM Streaks
    GROUP BY player_id
)
SELECT 
    p.player_id,
    COALESCE(m.longest_streak, 0) AS longest_streak
FROM (SELECT DISTINCT player_id FROM Matches) p
LEFT JOIN MaxStreaks m ON p.player_id = m.player_id;
