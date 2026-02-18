CREATE DATABASE IF NOT EXISTS exam;
USE exam;
create table todos( id int not null auto_increment primary key , title varchar(255) not null , status varchar(40) default 'created' , problem_desc varchar(255) default null );