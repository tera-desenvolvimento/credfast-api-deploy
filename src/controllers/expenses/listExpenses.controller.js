const expenseModel = require("../../models/expense.model");

async function listExpenses(sellerId) {
    try {
        const expenses = await expenseModel.find({sellerId: sellerId}).limit(7);

        return expenses;
    } catch (error) {
        return error
    }
}

module.exports = listExpenses;