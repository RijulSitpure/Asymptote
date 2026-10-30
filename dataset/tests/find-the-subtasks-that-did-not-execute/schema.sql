CREATE TABLE IF NOT EXISTS Tasks (
    task_id INT PRIMARY KEY,
    subtasks_count INT
);
CREATE TABLE IF NOT EXISTS Executed (
    task_id INT,
    subtask_id INT,
    PRIMARY KEY (task_id, subtask_id)
);