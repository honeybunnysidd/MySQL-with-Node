CREATE TABLE users (
id VARCHAR(50) PRIMARY KEY,
username VARCHAR(50) UNIQUE,
email VARCHAR(50) NOT NULL,
password VARCHAR(50) NOT NULL
);

-- Run source schema.sql in terminal with mysql>