WITH first_positive AS (
    SELECT 
        patient_id,
        MIN(test_date) AS pos_date
    FROM covid_tests
    WHERE result = 'Positive'
    GROUP BY patient_id
),
first_subsequent_negative AS (
    SELECT 
        fp.patient_id,
        fp.pos_date,
        MIN(ct.test_date) AS neg_date
    FROM first_positive fp
    JOIN covid_tests ct ON fp.patient_id = ct.patient_id
    WHERE ct.result = 'Negative' AND ct.test_date > fp.pos_date
    GROUP BY fp.patient_id, fp.pos_date
)
SELECT 
    p.patient_id,
    p.patient_name,
    p.age,
    DATEDIFF(fn.neg_date, fn.pos_date) AS recovery_days
FROM first_subsequent_negative fn
JOIN patients p ON fn.patient_id = p.patient_id
ORDER BY recovery_days ASC, p.patient_id ASC;
