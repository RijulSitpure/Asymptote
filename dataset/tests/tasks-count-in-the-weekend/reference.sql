SELECT
  SUM(CASE WHEN WEEKDAY(assign_date) >= 5 THEN 1 ELSE 0 END) AS weekend_cnt,
  SUM(CASE WHEN WEEKDAY(assign_date) < 5 THEN 1 ELSE 0 END) AS working_cnt
FROM Tasks;
