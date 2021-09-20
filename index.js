const express = require('express');
const db = require('./config/connection');
const { prompt } = require('inquirer');
const { Router } = require('express');
require("console.table");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



initilize();

function initilize() {
  prompt
    ([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'todo',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
      }
    ])
    .then((res => {
      const todo = res.todo;
      // console.log(res.todo)
      switch (res.todo) {
        case 'view all departments':
          db.query(`SELECT id AS 'DEPARTMENT ID', name AS 'DEPARTMENT NAME' FROM department`, function (err, results) {
            console.table(results);
          });
          initilize();
          break;
        case 'view all roles':
          db.query(`SELECT role.title AS 'JOB TITLE', role.id AS 'ROLE ID', department.name AS 'DEPARTMENT', role.salary as 'SALARY' FROM department JOIN role ON role.department_id = department.id`, function (err, results) {
            console.table(results);
          });
          initilize();
          break;
        case 'view all employees':
          db.query(`SELECT employee.id AS 'EMPLOYEE ID' , employee.first_name AS 'FIRST', employee.last_name AS 'LAST', role.title AS 'JOB TITLE', department.name as 'DEPARTMENT', role.salary as 'SALARY', employee.manager_id as 'MANAGER' 
        FROM department 
        JOIN role ON role.department_id = department.id
        JOIN employee ON employee.role_id = role.id`, function (err, results) {
            console.table(results);
          });
          initilize();
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
        default:
          process.exit()
          break;
      }

    }));
};



function addDepartment() {
  prompt([
    {
      type: 'input',
      message: 'New department name?',
      name: 'name'
    }
  ])
    .then((res) => {
      const name = res;
      db.query(`INSERT INTO department (name) VALUES ('${name.name}')`)
      console.log(`Added ${name.name} as a new department`)
      initilize();
    })

}



function addRole() {
  db.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    // console.log(res.map(res => res))
    let choice = res.map(res => ({value:res.id, name:res.name}))
    prompt([
      {
        type: 'input',
        message: 'Title?',
        name: 'title'
      },
      {
        type: 'input',
        message: 'Salary?',
        name: 'salary'
      },
      {
        type: 'list',
        message: 'Department?',
        name: 'department_name',
        choices: choice
      },
    ])
      .then((res) => {
        console.log(res)
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${res.title}', ${res.salary}, ${res.department_name})`);
        console.log(`Added ${res.title}`);
        initilize();

      });
  })
};


function addEmployee() {
  db.query("SELECT title FROM role", (err, res) => {
    if (err) throw err;
    // console.log(res.map(res => res.name))
    let roles = res.map(res => res.title)
    db.query('SELECT manager_id FROM employee', (err, res) => {
      if (err) throw err;
      const managers = res.map(res => res.manager_id)

      prompt([
        {
          type: 'input',
          message: 'Employee First Name',
          name: 'first_name'
        },
        {
          type: 'input',
          message: 'Employee Last Name',
          name: 'last_name'
        },
        {
          type: 'list',
          message: 'Employee Role',
          name: 'role',
          choices: roles
        },
        {
          type: 'list',
          message: 'Who is the Manager?',
          name: 'manager',
          choices: managers
        },
      ])
        .then((res) => {
          const newRole = res;
          db.query(`INSERT INTO department (name) VALUES ('${newRole.first_name}')`)
          console.log(`Added ${newRole.first_name} as a new employee`)
          initilize();
        })
    });
  });
};