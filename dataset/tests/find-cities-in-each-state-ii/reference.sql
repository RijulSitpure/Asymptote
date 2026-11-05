SELECT 
    state, 
    GROUP_CONCAT(city ORDER BY city ASC SEPARATOR ', ') AS cities,
    COUNT(CASE WHEN LEFT(city, 1) = LEFT(state, 1) THEN 1 END) AS matching_letter_count
FROM cities
GROUP BY state
HAVING 
    COUNT(city) >= 3 
    AND COUNT(CASE WHEN LEFT(city, 1) = LEFT(state, 1) THEN 1 END) > 0
ORDER BY 
    matching_letter_count DESC, 
    state ASC;
