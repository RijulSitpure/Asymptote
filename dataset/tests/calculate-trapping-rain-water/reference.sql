WITH T AS (
    SELECT
        height,
        MAX(height) OVER (ORDER BY id ASC) AS left_max,
        MAX(height) OVER (ORDER BY id DESC) AS right_max
    FROM Heights
)
SELECT
    SUM((CASE WHEN left_max < right_max THEN left_max ELSE right_max END) - height) AS total_trapped_water
FROM T;
