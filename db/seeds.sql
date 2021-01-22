USE companyDB;

INSERT INTO department (name)
VALUES("Engineering"), ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES("Software Engineer", 50000, 1), ("Accountant", 125000, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES("Mike", "Lourd", 1), ("Kevin", "Tupik", 2);