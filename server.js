const mysql = require('mysql2'); 
const inquier = require('inquirer');
const consoleTable = require('console.table'); 
const inquirer = require('inquirer');


const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Rr!528183', 
    database:'employee_tracker', 
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
            switch(answer.options){
                case 'View all employees':
                    viewAllEmployees();
                break;
                case 'View all departments':
                    viewDep();
                    break;
                case 'View all roles':
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
                case 'None':
                    leaveApp();
                    break;
                default:
                    break;
            }
        })
  
 };
 
function viewAllEmployees() {
    console.log('showing all employees...\n'); 
    var query = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
        if(err)throw err;
        console.log(res.length + 'Found employees!');
        console.table('employee:', res);
        questions();
    })
 };
 
 function viewDep() {
     console.log('Showing all Departments...\n'); 
    var query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
        if(err)throw err;
        console.table('All Departments:', res);
        questions();
    })
};

function viewRoles() {
    console.log('Showing all roles...\n'); 
    var query = 'SELECT * FROM role';
    connection.query(query, function(err, res){
        if(err)throw err;
        console.table('All Roles:', res);
        questions();
    })
};
  

function addEmp() {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err; 
        inquirer.prompt([
                {
                    name: 'first_name',
                    type: 'input',
                    message: "What is the employees first name?",
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: 'What is the employees last name?',
                },
                {
                    name: 'manager_id',
                    type: 'input',
                    message: 'What is the employees manager id?',
                },
                {
                    name: 'role',
                    type:'list',
                    choices: function() {
                        var roleArray = [];
                        for (let i = 0; i < res.length; i++) {
                            roleArray.push(res[i].title); 
                        }
                        return roleArray; 
                    },
                    message: 'What is the employees role?',
                }
            ]).then(function (answer) {
                let role_id; 
                for (let a=0; a < res.length; a++) {
                    if (res[a].title == answer.role) {
                        role_id = res[a].id; 
                        console.log(role_id)
                    }
                }
                connection.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id: role_id,
                    }, 
                    function (err) {
                        if (err) throw err; 
                        console.log('employee successfully added!');
                        questions(); 
                    }
                )
            })
    })
};

function addDep() {
    inquirer .prompt([
            {
                name: 'addDepartment',
                type: 'input',
                message: 'Which department would you like to add?'
            }
        ]).then(function (answer) {
            connection.query(
                'INSERT INTO department SET ?',
                {
                    name: answer.addDepartment
                }); 
                var query = 'SELECT * FROM department'; 
                connection.query(query, function(err, res) {
                    if (err)throw err; 
                    console.log('Department has been successfully added!');
                    console.table('All Departments:', res); 
                    questions(); 
                })
        })
}; 

function addRole() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err)throw err; 
        inquirer.prompt([
                {
                    name: 'new_role',
                    type: 'input', 
                    message: 'Please type in the new role'
                }, 
                {
                    name: 'salary',
                    type: 'input', 
                    message: 'What is the salary of this position?'
                },
                {
                    name: 'department',
                    type: 'list',
                    choices: function() {
                        var depArry = []; 
                        for (let i = 0; i < res.length; i++) {
                            depArry.push(res[i].name); 
                        }
                        return depArry; 
                    }, 
                }
            ]).then(function (answer) {
                let department_id; 
                for (let a = 0; a < res.length; a++) {
                    if (res[a].name == answer.department) {
                        department_id = res[a].id; 
                    }
                }
                connection.query(
                    'INSERT INTO role SET ?',
                    {
                        title: answer.new_role, 
                        salary: answer.salary,
                        department_id: department_id
                    }, 
                    function(err, res) {
                        if(err)throw err;
                        console.log('New role successfully added!');
                        console.table('All Roles', res);
                        questions(); 
                    }
                )
            })
    })
}; 
