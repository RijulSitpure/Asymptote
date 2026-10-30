DROP TABLE IF EXISTS Buses;
CREATE TABLE Buses (
    bus_id INT PRIMARY KEY,
    arrival_time INT
);

DROP TABLE IF EXISTS Passengers;
CREATE TABLE Passengers (
    passenger_id INT PRIMARY KEY,
    arrival_time INT
);
