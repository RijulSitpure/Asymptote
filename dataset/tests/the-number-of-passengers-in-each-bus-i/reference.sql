WITH PassengerBus AS (
    SELECT p.passenger_id, MIN(b.arrival_time) AS bus_arrival_time
    FROM Passengers p
    JOIN Buses b ON p.arrival_time <= b.arrival_time
    GROUP BY p.passenger_id
)
SELECT b.bus_id, COUNT(pb.passenger_id) AS passengers_cnt
FROM Buses b
LEFT JOIN PassengerBus pb ON b.arrival_time = pb.bus_arrival_time
GROUP BY b.bus_id
ORDER BY b.bus_id ASC;
