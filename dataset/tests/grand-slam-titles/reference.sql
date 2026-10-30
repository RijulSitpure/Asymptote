SELECT
    p.player_id,
    p.player_name,
    SUM(p.player_id = c.Wimbledon) +
    SUM(p.player_id = c.Fr_open) +
    SUM(p.player_id = c.US_open) +
    SUM(p.player_id = c.Au_open) AS grand_slams_count
FROM Players p
JOIN Championships c ON p.player_id IN (c.Wimbledon, c.Fr_open, c.US_open, c.Au_open)
GROUP BY p.player_id, p.player_name;