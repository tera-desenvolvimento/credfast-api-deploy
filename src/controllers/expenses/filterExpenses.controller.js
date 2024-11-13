const expenseModel = require("../../models/expense.model");

async function filterExpenses(sellerId, initialDate, finalDate) {
    try {
        const expenses = await expenseModel.find({sellerId: sellerId});
        var filteredExpenses = [];
        var iniDate = new Date(initialDate);
        var finDate = new Date(finalDate);

        expenses.forEach(expense => {
            var expenseDate = new Date(expense.date);
            if(expenseDate >= iniDate && expenseDate <= finDate) {
                filteredExpenses.push(expense);
            }
        })

        return filteredExpenses;
    } catch (error) {
        return error;
    }
}

module.exports = filterExpenses;