var mysql = require("mysql");
var inquirer = require("inquirer");
var {promisify} = require("util");


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
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles",
                "Add Role", "View All Departments", "Add Department"
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
        "SELECT * FROM employee",
        (err, data) => {
            if (err) throw err;
            console.table(data);
            console.log("All employees logged successfully!");
            init();
        }
    );
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
            console.log(chosenRoleObj[0].id);

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

async function getRoles() {
    return connection.query("SELECT * FROM role");
}

async function addRole() {
    const rolesData = await getRoles();
    const roles = [];
    rolesData.forEach((role) => {
        roles.push(role.title);
    });
    console.log(rolesData);
    inquirer
        .prompt([{
            name: "role",
            type: "list",
            message: "What is the employee's role?",
            choices: roles
        }])
        .then(function (answer) {

            connection.query(
                "SELECT * FROM role",
                (err, data) => {
                    if (err) throw err;
                    console.table(data);
                    role.push(data);
                    console.log("All employees logged successfully!");
                    init();
                }
            );

            connection.query(
                "INSERT INTO employee SET ?", {
                    first_name: answer.firstName,
                    last_name: answer.lastName
                },
                function (err) {
                    if (err) throw err;
                    // let employee = {
                    //     first_name: answer.firstName,
                    //     last_name: answer.lastName
                    // }
                    // employees.push(employee);
                    // console.log(employees);
                    // console.log(employee);
                    console.log("All employees logged successfully!");
                    init();
                }
            );
        });
}

// function updateEmployeeRole() {
//     inquirer
//         .prompt({
//             name: "selection",
//             type: "list",
//             message: "Who do you want to update?",
//             choices: employees
//         }).then(function (answer) {
//             inquirer
//                 .prompt([{
//                         name: "firstName",
//                         type: "input",
//                         message: "What is the employee's first name?",
//                     },
//                     {
//                         name: "lastName",
//                         type: "input",
//                         message: "What is the employee's last name?",
//                     }
//                 ])
//                 .then(function (answer) {

//                     connection.query(
//                         "INSERT INTO employee SET ?", {
//                             first_name: answer.firstName,
//                             last_name: answer.lastName
//                         },
//                         function (err) {
//                             if (err) throw err;
//                             console.log("All employees logged successfully!");
//                             init();
//                         }
//                     );


//                 });

//         });

// }