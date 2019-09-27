select * from users1 u
join posts p on u.id = p.author_id
where title like $1;
