const debitModel = require("../../models/debit.model");

async function listDebits(sellerId) {
    try {
        const debits = await debitModel.find({sellerId: sellerId, isQuited: false});

        return debits;
    } catch (error) {
        return error
    }
}

module.exports = listDebits;