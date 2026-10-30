WITH Ranked AS (
  SELECT city_id, day, degree,
         ROW_NUMBER() OVER (PARTITION BY city_id ORDER BY degree DESC, day ASC) AS rn
  FROM Weather
)
SELECT city_id, day, degree
FROM Ranked
WHERE rn = 1
ORDER BY city_id;
