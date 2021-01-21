DROP DATABASE IF EXISTS companyDB;
CREATE DATABASE companyDB;

USE companyDB;

CREATE TABLE department (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,4) NULL,
    -- department_id 
    PRIMARY KEY (id)
);

CREATE TABLE employee(
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    -- role_id
    PRIMARY KEY(id)
);

SELECT * FROM department, role, employee;