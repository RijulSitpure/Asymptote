WITH RECURSIVE SubtaskGenerator AS (
    SELECT task_id, subtasks_count, 1 AS subtask_id
    FROM Tasks
    UNION ALL
    SELECT task_id, subtasks_count, subtask_id + 1
    FROM SubtaskGenerator
    WHERE subtask_id < subtasks_count
)
SELECT s.task_id, s.subtask_id
FROM SubtaskGenerator s
LEFT JOIN Executed e ON s.task_id = e.task_id AND s.subtask_id = e.subtask_id
WHERE e.subtask_id IS NULL;