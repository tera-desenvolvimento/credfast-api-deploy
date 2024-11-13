const debitModel = require("../../models/debit.model");

async function paymentsRemaing(sellerId) {
    try {
        const debits = await debitModel.find({ sellerId:sellerId, isQuited: false });
        var paymentsRemaing = 0;

        debits.forEach(debit => {
            paymentsRemaing = parseFloat(paymentsRemaing) + parseFloat(debit.valueRemaing);
        })

        return paymentsRemaing;

    } catch (error) {
        return error;
    }
}

module.exports = paymentsRemaing;