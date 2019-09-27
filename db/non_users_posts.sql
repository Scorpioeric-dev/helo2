select * from users1 u
join posts p on u.id = p.author_id
where u.id not in ($1) 