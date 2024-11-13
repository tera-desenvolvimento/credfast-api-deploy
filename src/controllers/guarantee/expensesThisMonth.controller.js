const expenseModel = require("../../models/expense.model");
const dateCraft = require("date-craft");

async function expensesThisMonth(sellerId) {
    try {
        const expenses = await expenseModel.find({sellerId: sellerId});
        var monthExpenses = 0;
        
        var newActualDate = dateCraft.getCurrentDate();
        newActualDate.setHours(newActualDate.getHours() - 3);

        expenses.forEach(expense => {
            var expenseDate = new Date(expense.date);
            if(expenseDate.getMonth() === newActualDate.getMonth()) {
                monthExpenses = parseFloat(monthExpenses) + parseFloat(expense.value);
            }
        })

        return monthExpenses;
    } catch (error) {
        return error;
    }
}

module.exports = expensesThisMonth;