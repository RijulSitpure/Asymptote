CREATE TABLE Activity (
    machine_id INT,
    process_id INT,
    activity_type VARCHAR(10),
    timestamp FLOAT,
    PRIMARY KEY (machine_id, process_id, activity_type)
);
