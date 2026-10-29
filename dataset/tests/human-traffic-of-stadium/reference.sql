WITH HighTraffic AS (
    SELECT id, visit_date, people,
           id - ROW_NUMBER() OVER (ORDER BY id) AS grp
    FROM Stadium
    WHERE people >= 100
),
GroupCounts AS (
    SELECT grp, COUNT(*) AS cnt
    FROM HighTraffic
    GROUP BY grp
    HAVING cnt >= 3
)
SELECT h.id, h.visit_date, h.people
FROM HighTraffic h
JOIN GroupCounts g ON h.grp = g.grp
ORDER BY h.id;