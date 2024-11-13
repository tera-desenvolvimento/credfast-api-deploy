const expenseModel = require('../../models/expense.model');

async function createExpense(description, date, value, sellerId) {
    try {
        const expenseCreated = await expenseModel.create(
            {
                description,
                value,
                date,
                sellerId
            }
        );

        return expenseCreated;
    } catch (error) {
        return error;
    }
}

module.exports = createExpense;