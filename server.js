const mysql = require('mysql2');
const inquier = require('inquirer');
const consoleTable = require('console.table'); 

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Rr!528183', 
    database:'', 
}); 