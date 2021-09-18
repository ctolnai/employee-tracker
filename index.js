const fs = require('fs');
const express = require('express');
const db = require('./config/connection');
const inquirer = require('inquirer');
const { INITIALLY_DEFERRED } = require('sequelize/types/lib/deferrable');
require("console.table");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sync().then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

init();
