CREATE TABLE IF NOT EXISTS Tweets (
    user_id INT,
    tweet_id INT PRIMARY KEY,
    tweet_date DATE,
    tweet VARCHAR(500)
);
