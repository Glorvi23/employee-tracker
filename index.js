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
    // init();
        console.log("string connect to the database");

});

function init(){

}