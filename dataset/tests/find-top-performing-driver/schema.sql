CREATE TABLE Drivers (
    driver_id INT PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    experience INT,
    accidents INT
);

CREATE TABLE Vehicles (
    vehicle_id INT PRIMARY KEY,
    driver_id INT,
    model VARCHAR(50),
    fuel_type VARCHAR(50),
    mileage INT
);

CREATE TABLE Trips (
    trip_id INT PRIMARY KEY,
    vehicle_id INT,
    distance INT,
    duration INT,
    rating INT
);
