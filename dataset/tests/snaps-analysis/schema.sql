CREATE TABLE IF NOT EXISTS Activities (
    activity_id INT,
    user_id INT,
    activity_type VARCHAR(20),
    time_spent DECIMAL(10, 2)
);
CREATE TABLE IF NOT EXISTS Age (
    user_id INT,
    age_bucket VARCHAR(20)
);
