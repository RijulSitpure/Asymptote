SELECT 
    b.book_id,
    b.title,
    b.author,
    b.total_copies
FROM library_books b
JOIN borrowing_records r ON b.book_id = r.book_id
WHERE r.return_date IS NULL
GROUP BY b.book_id, b.title, b.author, b.total_copies
HAVING COUNT(r.record_id) = b.total_copies
ORDER BY b.total_copies DESC, b.book_id ASC;
