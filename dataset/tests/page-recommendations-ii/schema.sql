CREATE TABLE IF NOT EXISTS Friendship (
    user1_id INT,
    user2_id INT,
    PRIMARY KEY (user1_id, user2_id)
);
CREATE TABLE IF NOT EXISTS Likes (
    user_id INT,
    page_id INT,
    PRIMARY KEY (user_id, page_id)
);