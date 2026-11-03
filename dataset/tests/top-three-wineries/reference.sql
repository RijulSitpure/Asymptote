WITH WineryToTotalPoints AS (
    SELECT 
        country, 
        winery, 
        SUM(points) AS total_points 
    FROM Wineries 
    GROUP BY country, winery
), 
RankedWineries AS (
    SELECT 
        country,
        winery,
        total_points,
        ROW_NUMBER() OVER(PARTITION BY country ORDER BY total_points DESC, winery ASC) AS rn 
    FROM WineryToTotalPoints
) 
SELECT 
    country, 
    MAX(CASE WHEN rn = 1 THEN CONCAT(winery, ' (', total_points, ')') END) AS top_winery, 
    IFNULL(MAX(CASE WHEN rn = 2 THEN CONCAT(winery, ' (', total_points, ')') END), 'No second winery') AS second_winery, 
    IFNULL(MAX(CASE WHEN rn = 3 THEN CONCAT(winery, ' (', total_points, ')') END), 'No third winery') AS third_winery 
FROM RankedWineries 
WHERE rn <= 3 
GROUP BY country 
ORDER BY country ASC;
