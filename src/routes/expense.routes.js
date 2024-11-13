const router = require('express').Router();

const createExpense = require('../controllers/expenses/createExpense.controller');
const listExpenses = require('../controllers/expenses/listExpenses.controller');
const removeExpense = require('../controllers/expenses/removeExpense.controller');
const filterExpenses = require('../controllers/expenses/filterExpenses.controller');

router.post('/expense/create', (req, res) => {
    const { description, date, value, sellerId } = req.body;

    createExpense(description, date, value, sellerId)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.json(err)
        })
});

router.post('/expense/list', (req, res) => {
    const { sellerId } = req.body;

    listExpenses(sellerId)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.json(err)
        })
})

router.post('/expense/remove', (req, res) => {
    const { expenseId } = req.body;

    removeExpense(expenseId)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.json(err)
        })
})

router.post('/expense/filter', (req, res) => {
    const { sellerId, initialDate, finalDate } = req.body;

    filterExpenses(sellerId, initialDate, finalDate)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.json(err)
        })
})

module.exports = router;