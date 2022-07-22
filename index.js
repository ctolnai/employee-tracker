const express = require('express');
const db = require('./config/connection');
const { prompt } = require('inquirer');
const { Router } = require('express');
require("console.table");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function initilize() {
  prompt
    ([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'todo',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update employee role', 'quit']
      }
    ])
    .then((res => {
      const todo = res.todo;
      switch (res.todo) {
        case 'view all departments':
         viewDepartments();
          break;
        case 'view all roles':
          viewRoles();
          break;
        case 'view all employees':
          viewEmployees();
          break;
        case 'add a department':
          addDepartment();
          break;
        case 'add a role':
          addRole();
          break;
        case 'add an employee':
          addEmployee();
          break;
        case 'update employee role':
          updateEmployee();
          break;
        case 'quit':
          process.exit()
        default:
          break;
      }

    }));
};
function viewDepartments(){
  db.query(`SELECT id AS 'DEPARTMENT ID', name AS 'DEPARTMENT NAME' FROM department`, function (err, results) {
    console.log('\n');console.table(results);
  });
  initilize();
}
function viewRoles(){
  db.query(`SELECT role.title AS 'JOB TITLE', role.id AS 'ROLE ID', department.name AS 'DEPARTMENT', role.salary as 'SALARY' FROM department JOIN role ON role.department_id = department.id`, function (err, results) {
    console.log('\n');console.table(results);
  });
  initilize();
}
function viewEmployees(){
  db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;`, function (err, results) {
    console.log('\n');console.table(results);
    });
    initilize();
}
function addDepartment() {
  prompt([
    {
      type: 'input',
      message: 'What is the name of the department?',
      name: 'name'
    }
  ])
    .then((res) => {
      const name = res;
      db.query(`INSERT INTO department (name) VALUES ('${name.name}')`)
      initilize();
    })
}

function addRole() {
  db.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    const choice = res.map(res => ({ value: res.id, name: res.name }))
    prompt([
      {
        type: 'input',
        message: 'What is the name of the role?',
        name: 'title'
      },
      {
        type: 'input',
        message: 'What is the salary of the role?',
        name: 'salary'
      },
      {
        type: 'list',
        message: 'Which department does the role belong to?',
        name: 'department_name',
        choices: choice
      },
    ])
      .then((res) => {
        // console.log(res)
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${res.title}', ${res.salary}, ${res.department_name})`);

        initilize();

      });
  })
};


function addEmployee() {
  db.query('SELECT * FROM employee JOIN role ON role.id = employee.role_id;', (err, res) => {
    if (err) throw err;
    const role = res.map(res => ({ value: res.role_id, name: res.title }));
    const managers = res.map(res => ({ value: res.id, name: res.first_name }));

    // console.log(role);
    prompt([
      {
        type: 'input',
        message: "What is the employee's first name?",
        name: 'first_name'
      },
      {
        type: 'input',
        message: "What is the employee's last name?",
        name: 'last_name'
      },
      {
        type: 'list',
        message: "What is the employee's role?",
        name: 'role',
        choices: role
      },
      {
        type: 'list',
        message: "Who is the employee's manager?",
        name: 'manager',
        choices: managers
      },
    ])
      .then((res) => {
        const newRole = res;
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${newRole.first_name}', '${newRole.last_name}', ${newRole.role}, ${newRole.manager})`);
        initilize();
      })
  });
};

function updateEmployee() {
  db.query('SELECT * FROM employee JOIN role ON role.id = employee.role_id;', (err, res) => {
    if (err) throw err;
    const name = res.map(res => ({ value: res.id, name: res.first_name }));
    const role = res.map(res => ({ value: res.id, name: res.title }));
        // console.log(res);
    prompt([
      {
        type: 'list',
        message: "Which employee's role do you want to update?",
        name: 'name',
        choices: name
      },
      {
        type: 'list',
        message: "Which role do you want to assign to the selected employee?",
        name: 'role',
        choices: role
      },
    ])
      .then((res) => {
        db.query(`UPDATE employee SET role_id = ${res.role} WHERE id = ${res.name}`);
        initilize();
      })
  });
};

initilize();