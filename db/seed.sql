drop table users1;
drop table posts;


create table users1 (
id serial primary key,
username varchar(200),
password varchar(200),
profile_pic text);




create table posts(
id serial primary key,
title varchar(3000),
img text,
content text,
author_id integer references users1(id));


insert into users1(username,password,profile_pic)
values('batman','aaa','https://cdn.pixabay.com/photo/2015/11/30/14/10/batman-1070422_960_720.jpg'),('superman','bbb','https://cdn.pixabay.com/photo/2019/05/25/06/38/superman-4227850_960_720.jpg'),
('flash','ccc','https://i.ytimg.com/vi/UE6dYfcAnrU/maxresdefault.jpg');

select * from users1;


insert into posts(title,img,content,author_id)
values('jk rowling','http://www.notable-quotes.com/r/j_k_rowling_quote.jpg','harry potter',1),('derek gibbons','https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1390173037i/20580148._UY630_SR1200,630_.jpg','Roman Empire',2),('God','https://www.biblicalarchaeology.org/wp-content/uploads/2011/11/isaiah-scroll.jpg','Palabra',3);

select * from posts;



select * from users1
where username = 'batman' and password = 'aaa'; 



-- alter table posts
-- drop column img;
