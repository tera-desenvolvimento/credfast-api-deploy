const debitModel = require("../../models/debit.model");

async function listCustomerDebits(sellerId, customerId) {
    try {
        const debits = await debitModel.find({sellerId: sellerId, "customerData.customerId": customerId});

        return debits;
    } catch (error) {
        return error
    }
}

module.exports = listCustomerDebits;