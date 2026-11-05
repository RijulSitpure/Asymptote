CREATE TABLE IF NOT EXISTS emails (
    email_id INT,
    user_id INT,
    signup_date DATETIME
);
CREATE TABLE IF NOT EXISTS texts (
    text_id INT,
    email_id INT,
    signup_action VARCHAR(20),
    action_date DATETIME
);
