const express = require('express');
const db = require('./config/connection');
const { prompt } = require('inquirer');
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
        case 'add a role':
          addRole();
        default:
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
      type: 'input',
      message: 'Department?',
      // this can't just be an input, needs to be a list from departments
      name: 'department_name',
    },
  ])
    .then((res) => {
      const newRole = res;
      // need to enter a department_id to match with department?
      db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${newRole.title}', ${newRole.salary}, ${newRole.department_name})`)
      console.log(`Added ${newRole.title}`)
      initilize();
    })
}