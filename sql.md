# TYPES OF DATBASES
- relational: stores structured data
- non-relational: stores in a non-tabular format

# KEYS
- primary: ensures that the data collected in each certain column is unique
- foreign: columns that exist in 2+ databases, which provide a link between the two tables

# TO SET UP MySQL
$ mysql -u root -p


# DATABASE AND TABLE STATEMENTS
** all of this is in mysql> 
** apparently all of the sql commands are case insensitive
- to create database: $ CREATE DATABASE database_name;
- to show databases: $ SHOW DATABASES;
- to use database: $ USE database_name;
- to drop database: $ DROP database database_name
- to create table: $ CREATE TABLE example_table_name (
 example_column1 data_type,
 example_column2 data_type,
 example_column3 data_type
 );
- to show table: $ SHOW TABLES;
- to see what columns and their datatypes are contained w/in a table: $ DESCRIBE table_name ; 
- alter a table: $ ALTER TABLE table_name;
- drop a table: $ DROP TABLE table_name;


# CRUD (Create, Read, Update, Delete)
** use table
- create new records: $ INSERT INTO table_name (col1, col2, col3) VALUES (value1, value2, value3);
-  






