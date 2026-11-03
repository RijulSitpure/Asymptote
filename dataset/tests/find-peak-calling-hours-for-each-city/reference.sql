WITH CityHourCount AS (
    SELECT 
        city, 
        HOUR(call_time) AS peak_calling_hour, 
        COUNT(*) AS number_of_calls,
        RANK() OVER (PARTITION BY city ORDER BY COUNT(*) DESC) AS rk
    FROM Calls
    GROUP BY city, HOUR(call_time)
)
SELECT 
    city, 
    peak_calling_hour, 
    number_of_calls
FROM CityHourCount
WHERE rk = 1
ORDER BY peak_calling_hour DESC, city DESC;
