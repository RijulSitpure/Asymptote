CREATE TABLE drivers (
    driver_id INT PRIMARY KEY,
    driver_name VARCHAR(255)
);

CREATE TABLE trips (
    trip_id INT PRIMARY KEY,
    driver_id INT,
    trip_date DATE,
    distance_km DECIMAL(10, 2),
    fuel_liters DECIMAL(10, 2)
);
