SELECT id FROM (
  SELECT id, recordDate, temperature,
         LAG(recordDate) OVER (ORDER BY recordDate) AS prevDate,
         LAG(temperature) OVER (ORDER BY recordDate) AS prevTemp
  FROM Weather
) t
WHERE prevDate IS NOT NULL
  AND recordDate = DATE_ADD(prevDate, INTERVAL 1 DAY)
  AND temperature > prevTemp;
