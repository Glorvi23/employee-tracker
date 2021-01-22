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
    salary DECIMAL(10,3) NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department (id),
    PRIMARY KEY (id)
);

CREATE TABLE employee(
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES role (id),
    FOREIGN KEY (manager_id) REFERENCES employee (id),
    PRIMARY KEY(id)
);

INSERT INTO department (name)
VALUES("Engineering"), ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES("Software Engineer", 50000, 1), ("Accountant", 125000, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES("Mike", "Lourd", 1), ("Kevin", "Tupik", 2);

SELECT * FROM role, employee, department;
SELECT * FROM role;
SELECT * FROM employee;

