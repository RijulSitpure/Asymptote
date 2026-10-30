WITH BeforeRank AS (
    SELECT 
        team_id,
        name,
        points,
        ROW_NUMBER() OVER (ORDER BY points DESC, name ASC) AS old_rank
    FROM TeamPoints
),
AfterRank AS (
    SELECT 
        tp.team_id,
        tp.name,
        ROW_NUMBER() OVER (ORDER BY (tp.points + pc.points_change) DESC, tp.name ASC) AS new_rank
    FROM TeamPoints tp
    JOIN PointsChange pc ON tp.team_id = pc.team_id
)
SELECT 
    b.team_id,
    b.name,
    (CAST(b.old_rank AS SIGNED) - CAST(a.new_rank AS SIGNED)) AS rank_diff
FROM BeforeRank b
JOIN AfterRank a ON b.team_id = a.team_id;
