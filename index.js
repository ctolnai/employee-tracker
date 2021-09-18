const express = require('express');
const db = require('./config/connection');
const inquirer = require('inquirer');
require("console.table");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'todo',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
    }
  ])
  .then((res => {
    const todo = res.todo;
    console.log(res.todo)
    switch (res.todo) {
      case 'view all departments':
        db.query(`SELECT id AS 'DEPARTMENT ID', name AS 'DEPARTMENT NAME' FROM department`, function (err, results) {
          console.table(results);
        });
        break; 
      case 'view all roles':
        db.query(`SELECT role.title AS 'JOB TITLE' , role.id AS 'ROLE ID', department.department_name AS 'DEPARTMENT', role.salary as 'SALARY' FROM department JOIN role ON role.department_id = department.id`, function (err, results) {
          console.table(results);
        });
        break;
      case 'view all employees':
        db.query(`SELECT CONCAT(first_name, ' ', last_name) AS 'EMPLOYEES'
        FROM employee`, function (err, results) {
          console.table(results);
        });
        break;
       case 'add a department':

      default:
        break;
    }

  }));



