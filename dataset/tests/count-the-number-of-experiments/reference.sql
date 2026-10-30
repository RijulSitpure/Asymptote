WITH Platforms AS (
    SELECT 'Android' AS platform
    UNION ALL SELECT 'IOS'
    UNION ALL SELECT 'Web'
),
Names AS (
    SELECT 'Reading' AS experiment_name
    UNION ALL SELECT 'Sports'
    UNION ALL SELECT 'Programming'
),
AllPairs AS (
    SELECT p.platform, n.experiment_name
    FROM Platforms p
    CROSS JOIN Names n
)
SELECT
    a.platform,
    a.experiment_name,
    COUNT(e.experiment_id) AS num_experiments
FROM AllPairs a
LEFT JOIN Experiments e
    ON a.platform = e.platform
    AND a.experiment_name = e.experiment_name
GROUP BY a.platform, a.experiment_name;
