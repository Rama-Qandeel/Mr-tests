-- write the database name that you use here
create database project_5;
use project_5 

--store

CREATE table store_category (
store_categoryId int AUTO_INCREMENT NOT NULL,
categoryName varchar(55),
PRIMARY KEY (store_categoryId)
);

CREATE table store (
store_id int AUTO_INCREMENT NOT NULL,
user_id int,
store_category varchar(55),
store_name varchar(55),
store_pic varchar(255),
is_deleted BIT NOT NULL DEFAULT 0,
PRIMARY KEY (store_id)
);

--product 
CREATE table productCategory(
category_id int  NOT NULL ,
category_name varchar(55),
picture varchar(255) ,
PRIMARY key (categoryId)
);

CREATE table products(
product_id int AUTO_INCREMENT NOT NULL ,
category_id int ,
store_id int ,
item_id int ,
product_name varchar(255),
product_descripition varchar(255),
quantity_per_unit varchar(100),
unit_price int,
available_product Boolean ,
discount_available varchar(20),
picture varchar(255),
is_deleted  BIT NOT NULL DEFAULT 0,
PRIMARY key (product_id),
FOREIGN KEY (store_id) REFERENCES store(store_id),
FOREIGN KEY (category_id) REFERENCES productCategory(category_id)
);

--orders
CREATE table items (
item_id int auto_increment NOT NUll,
product_id int,
orders_id int ,
total_price int,
is_deleted BIT NOT NULL DEFAULT 0,
PRIMARY KEY (item_id),
FOREIGN KEY (product_id) REFERENCES products (product_id)
);

CREATE table orders(
orders_id int auto_increment NOT NULL,
user_id int,
delivary_user_id int ,
store_id int,
item_id int ,
is_deleted BIT NOT NULL DEFAULT 0,
PRIMARY KEY (orders_id),
FOREIGN KEY (item_id) REFERENCES items (item_id)
);

--users
CREATE TABLE roles (
role_id int NOT NULL,
type varchar(55),
 PRIMARY KEY (role_id)
 );

CREATE table payment (
payment_id int auto_increment NOT NULL,
payment_type varchar(255),
credit_card varchar(255),
credit_card_type varchar(255),
is_deleted tinyint default 0,
PRIMARY KEY (payment_id)
);

CREATE TABLE users (
user_id int auto_increment NOT NULL,
first_name varchar(25),
last_name varchar(25),
birhday date,
address varchar(255),
city varchar(255),
region varchar(255),
phone_number varchar(255),
email varchar(255) UNIQUE,
password varchar(255),
image_profile varchar(255),
payment_id int,
role_id int ,
store_id int ,
is_deleted TINYINT DEFAULT 0,
PRIMARY KEY (user_id),
FOREIGN KEY (payment_id) REFERENCES payment (payment_id),
FOREIGN KEY (store_id) REFERENCES store (store_id),
FOREIGN KEY (role_id) REFERENCES roles (role_id)
 );
