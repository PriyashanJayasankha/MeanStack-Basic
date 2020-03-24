const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db');
var employeeController = require('./controllers/employeeController');

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' })); // allowing this server for accessing the database

app.listen(3000, () => console.log('Express server started at port: 3000'));

app.use('/employees', employeeController);
