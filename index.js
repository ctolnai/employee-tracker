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
        db.query(`SELECT name AS 'DEPARTMENT' FROM department`, function (err, results) {
          console.table(results);
        });
        break;
      case 'view all roles':
        db.query(`SELECT title AS 'ROLES' FROM role`, function (err, results) {
          console.table(results);
        });
        break;
      case 'view all employees':
        db.query(`SELECT CONCAT(first_name, ' ', last_name) AS 'EMPLOYEES'
        FROM employee`, function (err, results) {
          console.table(results);
        });
        break;
      default:
        break;
    }

  }));



