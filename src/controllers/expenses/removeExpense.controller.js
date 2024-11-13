const expenseModel = require("../../models/expense.model");

async function removeExpense(expenseId) {
    try {
        const removedExpense = await expenseModel.findOneAndDelete({ _id: expenseId });

        return removedExpense;
    } catch (error) {
        return error
    }
}

module.exports = removeExpense;