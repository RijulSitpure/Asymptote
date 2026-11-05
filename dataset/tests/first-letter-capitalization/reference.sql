SELECT 
    uc.content_id, 
    uc.content_text AS original_text, 
    c.converted_text 
FROM user_content AS uc 
JOIN (
    WITH RECURSIVE Words AS (
        SELECT 
            content_id, 
            SUBSTRING_INDEX(content_text, ' ', 1) AS word, 
            SUBSTRING(content_text, LENGTH(SUBSTRING_INDEX(content_text, ' ', 1)) + 2) AS remaining_text, 
            1 AS token_index 
        FROM user_content 
        UNION ALL 
        SELECT 
            content_id, 
            SUBSTRING_INDEX(remaining_text, ' ', 1) AS word, 
            SUBSTRING(remaining_text, LENGTH(SUBSTRING_INDEX(remaining_text, ' ', 1)) + 2) AS remaining_text, 
            token_index + 1 AS token_index 
        FROM Words 
        WHERE remaining_text != ''
    )
    SELECT 
        content_id, 
        GROUP_CONCAT(
            CONCAT(
                UPPER(SUBSTRING(word, 1, 1)), 
                LOWER(SUBSTRING(word, 2))
            ) 
            ORDER BY token_index 
            SEPARATOR ' '
        ) AS converted_text 
    FROM Words 
    GROUP BY content_id
) AS c ON uc.content_id = c.content_id
ORDER BY uc.content_id;
