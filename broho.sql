drop database brohodb;
create database brohodb;
BEGIN;
  \c brohodb
  CREATE TABLE position(id int primary key,  title text not null, description text, recurring smallint not null);
  CREATE TABLE person(id int primary key, start_class text not null, first_name text not null, last_name text not null, start_semester text not null, end_semester text not null);
  CREATE TABLE floor(id int primary key, name text not null, description text);
  CREATE TABLE room(id int primary key, floor_id int references floor(id), room_num int not null, num_occupants int not null);
  CREATE TABLE picture(id int primary key, type text not null, type_id int not null, title text not null, description text, url text not null);
  CREATE TABLE enduser(id int primary key, first_name text not null, last_name text not null, email text not null, verified_floor_member smallint, role text not null);
  CREATE TABLE person_room(id int primary key, person_id int references person(id), room_id int references room(id), start_semester text not null, end_semester text not null);
  CREATE TABLE person_position(id int primary key, person_id int references person(id), position_id int references position(id), description text, start_semester date, end_semester date);
COMMIT;
