CREATE TABLE Drivers (driver_id int, join_date date);
CREATE TABLE Rides (ride_id int, user_id int, requested_at date);
CREATE TABLE AcceptedRides (ride_id int, driver_id int, ride_distance int, ride_duration int);
