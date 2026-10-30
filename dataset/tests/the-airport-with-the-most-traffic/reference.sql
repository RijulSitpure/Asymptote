WITH Traffic AS (
    SELECT departure_airport AS airport_id, flights_count FROM Flights
    UNION ALL
    SELECT arrival_airport AS airport_id, flights_count FROM Flights
),
Agg AS (
    SELECT airport_id, SUM(flights_count) AS total_traffic,
           DENSE_RANK() OVER (ORDER BY SUM(flights_count) DESC) AS rnk
    FROM Traffic
    GROUP BY airport_id
)
SELECT airport_id
FROM Agg
WHERE rnk = 1
ORDER BY airport_id ASC;
