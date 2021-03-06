var mysql = require("mysql");
var inquirer = require("inquirer");
var {
    promisify
} = require("util");


var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "mickey19",
    database: "companyDB"
});

connection.connect(function (err) {
    if (err) throw err;
    init();
    // console.log("string connect to the database");

});

connection.query = promisify(connection.query);

function init() {
    inquirer
        .prompt({
            name: "selection",
            type: "list",
            message: "What would you like to do?",
            choices: ["View All Employees", "View All Departments", "View All Roles", "Add Employee",
                "Add Role", "Add Department", "Update Employee Role", "EXIT"
            ]
        })
        .then(function (answer) {

            if (answer.selection === "View All Employees") {
                viewAllEmployees();
            } else if (answer.selection === "Add Employee") {
                addEmployee();
            } else if (answer.selection === "Update Employee Role") {
                updateEmployeeRole();
                // } else if (answer.selection === "Update Employee Manager") {
                //      //last
            } else if (answer.selection === "View All Roles") {
                viewAllRoles();
            } else if (answer.selection === "Add Role") {
                addRole();
                // } else if (answer.selection === "Remove Role") {
                //     //last
            } else if (answer.selection === "View All Departments") {
                viewAllDepartments();
            } else if (answer.selection === "Add Department") {
                addDepartment();
            } else {
                connection.end();
            }
        });
}

function viewAllEmployees() {
    connection.query(
        // "SELECT * FROM employee",
        "SELECT employee.id, CONCAT(last_name, ', ', first_name) AS 'Full Name', role.title AS 'Role Title', employee.manager_id AS Manager FROM employee INNER JOIN role ON employee.role_id = role.id ORDER BY employee.id ASC",
        (err, data) => {
            if (err) throw err;
            // console.log(data);
            console.table(data);
            console.log("All employees logged successfully!");
            init();
        }
    );
}

function viewAllDepartments() {
    connection.query(
        // "SELECT * FROM employee",
        "SELECT name AS Departments FROM department",
        (err, data) => {
            if (err) throw err;
            // console.log(data);
            console.table(data);
            console.log("All departments logged successfully!");
            init();
        }
    );
}

function viewAllRoles() {
    connection.query(
        // "SELECT * FROM role",
        "SELECT title AS Role, salary AS 'Annual Salary', department.name AS Department FROM role INNER JOIN department ON role.department_id = department.id ORDER BY role.id ASC",
        (err, data) => {
            if (err) throw err;
            // console.log(data);
            console.table(data);
            console.log("All roles logged successfully!");
            init();
        }
    );
}

async function getEmployees() {
    return connection.query("SELECT * FROM employee");
}

async function getRoles() {
    return connection.query("SELECT * FROM role");
}

async function getDepartment() {
    return connection.query("SELECT * FROM department");
}

async function addEmployee() {

    // const {fname, lastname} = await ing prompt
    inquirer
        .prompt([{
                name: "firstName",
                type: "input",
                message: "What is the employee's first name?",
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the employee's last name?",
            }
        ])
        .then(async function (answer) {
            const rolesData = await getRoles();
            const roles = [];
            rolesData.forEach((role) => {
                // console.log(role.title);
                roles.push(role.title);
            });

            const {
                chosenRole
            } = await inquirer
                .prompt([{
                    name: "chosenRole",
                    type: "list",
                    message: "What is the employee's role?",
                    choices: roles
                }])
            const chosenRoleObj = rolesData.filter((role) => {
                return chosenRole === role.title;
            });
            // console.log(chosenRoleObj[0].id);

            connection.query(
                "INSERT INTO employee SET ?", {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: chosenRoleObj[0].id
                },
                function (err) {
                    if (err) throw err;

                    console.log("Created new employee successfully!");
                    init();
                }
            );
        });

}

async function addRole() {
    const rolesData = await getRoles();
    const roles = [];
    rolesData.forEach((role) => {
        roles.push(role.title);
    });
    // console.log(rolesData);
    inquirer
        .prompt([{
            name: "role",
            type: "input",
            message: "What role to you want to add?"
        }])
        .then(async function (answer) {

            const departmentsData = await getDepartment();
            const departments = [];
            departmentsData.forEach((department) => {
                console.log(department.name);
                departments.push(department.name)
            })
            // console.log(departmentsData);
            const {
                chosenDepartment
            } = await inquirer
                .prompt([{
                    name: "chosenDepartment",
                    type: "list",
                    message: "What is the employee's department?",
                    choices: departments
                }])
            const chosenDepartmentObj = departmentsData.filter((department) => {
                return chosenDepartment === department.name;
            });
            // console.log(chosenDepartmentObj[0].id);

            const { chosenSalary } = await inquirer
                .prompt([{
                    name: "chosenSalary",
                    type: "input",
                    message: "What is the employee's salary?"
                }])
            // console.log(typeof chosenSalary);
            // const chosenSalaryObj = rolesData.filter((salary) => {
            //     return chosenSalary === salary.salary;
            // });

            // console.log(chosenSalaryObj);


            connection.query(
                "INSERT INTO role SET ?", {
                    title: answer.role,
                    salary: chosenSalary,
                    department_id: chosenDepartmentObj[0].id
                },
                function (err) {
                    if (err) throw err;

                    console.log("Role logged successfully!");
                    init();
                }
            );
        });
}

async function addDepartment() {
    inquirer
        .prompt([{
            name: "department",
            type: "input",
            message: "What department do you want to add?"
        }])
        .then(async function (answer) {
            connection.query(
                "INSERT INTO department SET ?", {
                    name: answer.department
                },
                function (err) {
                    if (err) throw err;

                    console.log("Department logged successfully!");
                    init();
                }
            );
        });
}

async function updateEmployeeRole() {
    const employeesData = await getEmployees();
    // console.log(employeesData);
    const employees = [];
    employeesData.forEach((emp) => {
        employees.push(emp.first_name + " " + emp.last_name);
    });
    // console.log(employees);
    const {
        chosenEmployee
    } = await inquirer
        .prompt([{
            name: "chosenEmployee",
            type: "list",
            message: "Select an employee to update their role: ",
            choices: employees
        }])
    console.log(chosenEmployee);

    const chosenEmployeesObj = employeesData.filter((emp) => {
        return chosenEmployee === emp.first_name + " " + emp.last_name;
    });
    // console.log(chosenEmployeesObj[0].id);

    // .then(async function (answer) {
    const rolesData = await getRoles();
    const roles = [];
    rolesData.forEach((role) => {
        // console.log(role.title);
        roles.push(role.title);
    });

    const {
        chosenRole
    } = await inquirer
        .prompt([{
            name: "chosenRole",
            type: "list",
            message: "What is the employee's role?",
            choices: roles
        }])
    const chosenRoleObj = rolesData.filter((role) => {
        return chosenRole === role.title;
    });
    // console.log(chosenRoleObj[0].id);

    connection.query(
        "UPDATE employee SET role_id = ? WHERE employee.id = ?", [
            chosenRoleObj[0].id,
            chosenEmployeesObj[0].id
        ],
        function (err) {
            if (err) throw err;

            console.log("Created new employee successfully!");
            init();
        }
    );
    // });

}