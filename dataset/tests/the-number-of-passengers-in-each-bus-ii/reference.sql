WITH RECURSIVE BusRank AS (
    SELECT 
        bus_id,
        arrival_time,
        capacity,
        ROW_NUMBER() OVER (ORDER BY arrival_time) AS rn
    FROM Buses
),
BusPassengers AS (
    SELECT 
        b.rn,
        b.bus_id,
        b.capacity,
        COUNT(p.passenger_id) AS total_arrived
    FROM BusRank b
    LEFT JOIN Passengers p ON p.arrival_time <= b.arrival_time
    GROUP BY b.rn, b.bus_id, b.capacity
),
BusNew AS (
    SELECT 
        rn,
        bus_id,
        capacity,
        total_arrived - COALESCE(LAG(total_arrived) OVER (ORDER BY rn), 0) AS new_passengers
    FROM BusPassengers
),
Sim AS (
    SELECT 
        rn,
        bus_id,
        CASE WHEN new_passengers < capacity THEN new_passengers ELSE capacity END AS boarded,
        CASE WHEN new_passengers > capacity THEN new_passengers - capacity ELSE 0 END AS waiting
    FROM BusNew
    WHERE rn = 1
    UNION ALL
    SELECT 
        b.rn,
        b.bus_id,
        CASE WHEN (s.waiting + b.new_passengers) < b.capacity THEN (s.waiting + b.new_passengers) ELSE b.capacity END AS boarded,
        CASE WHEN (s.waiting + b.new_passengers) > b.capacity THEN (s.waiting + b.new_passengers) - b.capacity ELSE 0 END AS waiting
    FROM Sim s
    JOIN BusNew b ON b.rn = s.rn + 1
)
SELECT bus_id, boarded AS passengers_cnt
FROM Sim
ORDER BY bus_id ASC;
