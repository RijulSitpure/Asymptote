SELECT gender, day, SUM(score_points) OVER (PARTITION BY gender ORDER BY day) AS total_points FROM Scores ORDER BY gender, day;
