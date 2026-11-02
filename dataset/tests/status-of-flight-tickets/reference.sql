SELECT 
    p.passenger_id,
    CASE 
        WHEN RANK() OVER (PARTITION BY p.flight_id ORDER BY p.booking_time ASC) <= f.capacity 
        THEN 'Confirmed' 
        ELSE 'Waitlist' 
    END AS status
FROM Passengers p
JOIN Flights f ON p.flight_id = f.flight_id
ORDER BY p.passenger_id ASC;