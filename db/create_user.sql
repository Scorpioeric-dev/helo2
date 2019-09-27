insert into users1(username,password)
values($1,$2)
returning*;
