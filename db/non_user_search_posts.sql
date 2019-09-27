SELECT * FROM users u 
JOIN posts p ON u.id = p.author_id
WHERE u.id NOT IN  ($1) AND title LIKE $2