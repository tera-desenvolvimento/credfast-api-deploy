const allDebitsThisMonth = require('./allDebitsThisMonth.controller');
const paymentsRemaing = require('./paymentsRemaining.controller');

const paymentsToday = require('./payments/paymentsToday.controller');
const paymentsThisWeek = require('./payments/paymentsThisWeek.controller');
const paymentsThisMonth = require('./payments/paymentsThisMonth.controller');

const debitsToday = require('./debits/debitsToday.controller');
const debitsThisWeek = require('./debits/debitsThisWeek.controller');
const debitsThisMonth = require('./debits/debitsThisMonth.controller');

const expensesThisMonth = require('./expensesThisMonth.controller');

async function loadGeneralData(sellerId) {
    return {
        paymentsToday: await paymentsToday(sellerId),
        paymentsThisWeek: await paymentsThisWeek(sellerId),
        paymentsThisMonth: await paymentsThisMonth(sellerId),
        creditsToday: await debitsToday(sellerId),
        creditsThisWeek: await debitsThisWeek(sellerId),
        creditsThisMonth: await debitsThisMonth(sellerId),
        paymentsRemaing: await paymentsRemaing(sellerId),
        allDebitsThisMonth: await allDebitsThisMonth(sellerId),
        expensesThisMonth: await expensesThisMonth(sellerId)
    }
}

module.exports = loadGeneralData;