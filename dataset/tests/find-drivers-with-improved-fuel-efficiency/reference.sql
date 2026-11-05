WITH ranked_trips AS (
    SELECT 
        trip_id,
        driver_id,
        trip_date,
        distance_km,
        fuel_liters,
        ROW_NUMBER() OVER (PARTITION BY driver_id ORDER BY trip_date ASC, trip_id ASC) AS rn,
        COUNT(*) OVER (PARTITION BY driver_id) AS total_trips
    FROM trips
),
split_halves AS (
    SELECT 
        driver_id,
        AVG(CASE WHEN rn <= FLOOR(total_trips / 2.0) THEN (distance_km / fuel_liters) END) AS first_half_avg,
        AVG(CASE WHEN rn > CEIL(total_trips / 2.0) THEN (distance_km / fuel_liters) END) AS second_half_avg
    FROM ranked_trips
    WHERE total_trips >= 4
    GROUP BY driver_id
)
SELECT 
    d.driver_id,
    d.driver_name,
    ROUND(s.first_half_avg, 2) AS first_half_avg,
    ROUND(s.second_half_avg, 2) AS second_half_avg,
    ROUND(s.second_half_avg - s.first_half_avg, 2) AS efficiency_improvement
FROM split_halves s
JOIN drivers d ON s.driver_id = d.driver_id
WHERE s.second_half_avg > s.first_half_avg
ORDER BY efficiency_improvement DESC, d.driver_id ASC;
