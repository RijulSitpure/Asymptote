SELECT
    p.post_id,
    COALESCE(GROUP_CONCAT(DISTINCT k.topic_id ORDER BY k.topic_id SEPARATOR ','), 'Ambiguous!') AS topic
FROM Posts p
LEFT JOIN Keywords k
    ON CONCAT(' ', LOWER(p.content), ' ') LIKE CONCAT('% ', LOWER(k.word), ' %')
GROUP BY p.post_id;