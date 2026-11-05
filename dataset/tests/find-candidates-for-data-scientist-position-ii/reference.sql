WITH ProjectSkills AS (
    SELECT project_id, COUNT(*) AS req_count
    FROM Projects
    GROUP BY project_id
),
CandidateScores AS (
    SELECT 
        p.project_id,
        c.candidate_id,
        COUNT(c.skill) AS matched_skills,
        100 + SUM(
            CASE 
                WHEN c.proficiency > p.importance THEN 10
                WHEN c.proficiency < p.importance THEN -5
                ELSE 0
            END
        ) AS score
    FROM Projects p
    JOIN Candidates c ON p.skill = c.skill
    GROUP BY p.project_id, c.candidate_id
),
RankedCandidates AS (
    SELECT 
        cs.project_id,
        cs.candidate_id,
        cs.score,
        ROW_NUMBER() OVER (
            PARTITION BY cs.project_id 
            ORDER BY cs.score DESC, cs.candidate_id ASC
        ) AS rnk
    FROM CandidateScores cs
    JOIN ProjectSkills ps ON cs.project_id = ps.project_id
    WHERE cs.matched_skills = ps.req_count
)
SELECT 
    project_id,
    candidate_id,
    score
FROM RankedCandidates
WHERE rnk = 1
ORDER BY project_id ASC;
