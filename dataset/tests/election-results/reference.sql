WITH WeightedVotes AS (
    SELECT 
        candidate,
        1.0 / COUNT(*) OVER (PARTITION BY voter) AS vote_weight
    FROM Votes
    WHERE candidate IS NOT NULL
),
CandidateTotals AS (
    SELECT 
        candidate,
        SUM(vote_weight) AS total_votes,
        DENSE_RANK() OVER (ORDER BY SUM(vote_weight) DESC) AS rk
    FROM WeightedVotes
    GROUP BY candidate
)
SELECT candidate
FROM CandidateTotals
WHERE rk = 1
ORDER BY candidate ASC;
