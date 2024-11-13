require('dotenv').config();

// Main Dependencies
const express = require('express');
const CORS = require("cors");
const bodyParser = require('body-parser');
const app = express();

// Guarantee Routes
const userRoutes = require('./routes/user.routes')
const customerRoutes = require('./routes/customer.routes');
const debitRoutes = require('./routes/debit.routes');
const expenseRoutes = require('./routes/expense.routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-Type");
    app.use(CORS());
    next();
})

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        status: 'active',
        message: 'API Initialized'
    })
})

app.use(userRoutes);
app.use(customerRoutes);
app.use(debitRoutes);
app.use(expenseRoutes);

require('../src/modules/databaseConnection.module');

app.listen(PORT);