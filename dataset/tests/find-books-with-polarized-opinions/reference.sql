SELECT 
    b.book_id,
    b.title,
    b.author,
    b.genre,
    COUNT(r.review_id) AS total_reviews,
    ROUND(SUM(CASE WHEN r.rating >= 4 THEN 1 ELSE 0 END) * 100.0 / COUNT(r.review_id), 2) AS positive_pct,
    ROUND(SUM(CASE WHEN r.rating <= 2 THEN 1 ELSE 0 END) * 100.0 / COUNT(r.review_id), 2) AS negative_pct
FROM Books b
JOIN Reviews r ON b.book_id = r.book_id
GROUP BY b.book_id, b.title, b.author, b.genre
HAVING COUNT(r.review_id) >= 5
   AND positive_pct >= 30.00
   AND negative_pct >= 30.00
ORDER BY b.book_id ASC;
