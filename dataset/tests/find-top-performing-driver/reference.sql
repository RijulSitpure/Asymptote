WITH DriverStats AS (
    SELECT 
        v.fuel_type,
        d.driver_id,
        ROUND(AVG(t.rating), 2) AS rating,
        SUM(t.distance) AS distance,
        d.accidents
    FROM Vehicles v
    JOIN Trips t ON v.vehicle_id = t.vehicle_id
    JOIN Drivers d ON v.driver_id = d.driver_id
    GROUP BY v.fuel_type, d.driver_id, d.accidents
),
Ranked AS (
    SELECT 
        fuel_type,
        driver_id,
        rating,
        distance,
        RANK() OVER (
            PARTITION BY fuel_type 
            ORDER BY rating DESC, distance DESC, accidents ASC
        ) AS rnk
    FROM DriverStats
)
SELECT fuel_type, driver_id, rating, distance
FROM Ranked
WHERE rnk = 1
ORDER BY fuel_type ASC;
