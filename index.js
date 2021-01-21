var mysql = require("mysql");
var inquirer = require("inquirer");


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

