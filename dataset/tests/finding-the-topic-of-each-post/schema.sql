CREATE TABLE Keywords (
    topic_id INT,
    word VARCHAR(50),
    PRIMARY KEY (topic_id, word)
);

CREATE TABLE Posts (
    post_id INT PRIMARY KEY,
    content VARCHAR(255)
);