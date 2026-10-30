WITH c1 AS (
    SELECT first_col, ROW_NUMBER() OVER (ORDER BY first_col ASC) AS rn
    FROM Data
),
c2 AS (
    SELECT second_col, ROW_NUMBER() OVER (ORDER BY second_col DESC) AS rn
    FROM Data
)
SELECT c1.first_col, c2.second_col
FROM c1
JOIN c2 ON c1.rn = c2.rn;
