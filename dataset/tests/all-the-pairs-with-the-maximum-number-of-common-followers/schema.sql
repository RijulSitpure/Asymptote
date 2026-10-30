CREATE TABLE Relations (
    user_id INT,
    follower_id INT,
    PRIMARY KEY (user_id, follower_id)
);
