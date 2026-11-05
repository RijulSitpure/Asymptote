SELECT
    team_id,
    team_name,
    wins * 3 + draws * 1 AS points,
    RANK() OVER (ORDER BY wins * 3 + draws * 1 DESC) AS position
FROM TeamStats
ORDER BY points DESC, team_name ASC;
