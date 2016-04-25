drop database brohodb;
create database brohodb;
\c brohodb
BEGIN;
  CREATE TABLE position(id serial primary key,  title text not null, description text, recurring smallint not null);
  CREATE TABLE person(id serial primary key, start_class text not null, first_name text not null, last_name text not null, start_semester text not null, end_semester text not null);
  CREATE TABLE floor(id serial primary key, name text not null, description text);
  CREATE TABLE room(id serial primary key, floor_id int references floor(id), room_num int not null, num_occupants int not null);
  CREATE TABLE picture(id serial primary key, table_type text not null, type_id int not null, title text not null, description text, url text not null, check (table_type = 'user' or table_type = 'person' or table_type = 'room' or table_type = 'floor'));
  CREATE TABLE enduser(id serial primary key, first_name text not null, last_name text not null, email text not null, verified_floor_member smallint, role text not null, password text not null);
  CREATE TABLE person_room(id serial primary key, person_id int references person(id), room_id int references room(id), start_semester text not null, end_semester text not null);
  CREATE TABLE person_position(id serial primary key, person_id int references person(id), position_id int references position(id), description text, start_semester date, end_semester date);
COMMIT;
