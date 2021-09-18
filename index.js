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
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role' ]
  }
])
.then((res => {
  const todo = res.todo;
  console.log (res.todo)
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
  });
}));



