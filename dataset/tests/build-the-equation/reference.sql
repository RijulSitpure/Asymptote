WITH FormattedTerms AS (
    SELECT 
        power,
        CONCAT(
            CASE WHEN factor > 0 THEN '+' ELSE '-' END,
            ABS(factor),
            CASE 
                WHEN power = 0 THEN ''
                WHEN power = 1 THEN 'X'
                ELSE CONCAT('X^', power)
            END
        ) AS term_str
    FROM Terms
)
SELECT 
    CONCAT(GROUP_CONCAT(term_str ORDER BY power DESC SEPARATOR ''), '=0') AS equation
FROM FormattedTerms;
