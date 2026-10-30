WITH AllMedals AS (
    SELECT contest_id, gold_medal AS user_id FROM Contests
    UNION ALL
    SELECT contest_id, silver_medal AS user_id FROM Contests
    UNION ALL
    SELECT contest_id, bronze_medal AS user_id FROM Contests
),
Streaks AS (
    SELECT
        user_id,
        contest_id - ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY contest_id) AS grp
    FROM AllMedals
),
ConsecutiveWinners AS (
    SELECT user_id
    FROM Streaks
    GROUP BY user_id, grp
    HAVING COUNT(*) >= 3
),
GoldWinners AS (
    SELECT gold_medal AS user_id
    FROM Contests
    GROUP BY gold_medal
    HAVING COUNT(*) >= 3
),
CandidateIds AS (
    SELECT user_id FROM ConsecutiveWinners
    UNION
    SELECT user_id FROM GoldWinners
)
SELECT u.name, u.mail
FROM Users u
JOIN CandidateIds c ON u.user_id = c.user_id;