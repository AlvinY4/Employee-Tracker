const mysql = require('mysql2');
const inquier = require('inquirer');
const consoleTable = require('console.table'); 

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Rr!528183', 
    database:'employees', 
}); 

connection.connect(function(err) {
    if (err) throw err 
    console.log("connected as id" + connection.threadId)
    questions(); 
})

function questions() {
    inquier
        .prompt({
            name: 'options',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all departments',
                'View all roles',
                'Add an employee',
                'Add a department', 
                'Add a role',
                'Change employee role',
                'Delete an employee',
                'None'
            ]
        }).then(function(answer) {
            switch(answer.action){
                case 'View all employees':
                    viewEmp();
                    break;
                case 'View all departments':
                    viewDep(); 
                    break; 
                case 'View all Roles':
                    viewRoles();
                    break;
                case 'Add an employee':
                    addEmp();
                    break;
                case 'Add a department':
                    addDep();
                    break;
                case 'Add a role':
                    addRole();
                    break; 
                case 'Change employee role':
                    changeRole(); 
                    break; 
                case 'Delete an employee':
                    deleteEmp();
                    break;
                case 'None': 
                    leaveApp();
                    break;
                default:
                    break; 
            }
        })

}; 

function viewEmp() {
    var query = 'SELECT * FROM employee'; 
    connection.query(query, function(err, res) {
        if (err) throw err; 
        console.log(res.length + 'Found employees!');
        console.table('Employees', res);
        questions(); 
    })
}; 

function viewDep() {
    
}