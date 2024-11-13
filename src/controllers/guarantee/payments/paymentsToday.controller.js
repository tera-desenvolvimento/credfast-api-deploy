const debitModel = require("../../../models/debit.model");
const dateCraft = require('date-craft');

async function paymentsToday(sellerId) {
    try {
        const debits = await debitModel.find({ sellerId:sellerId });
        var paymentsToday = 0;

        var newActualDate = dateCraft.getCurrentDate();
        newActualDate.setHours(newActualDate.getHours() - 3);

        debits.forEach(debit => {
            debit.payments.forEach(payment => {
                var paymentDate = new Date(payment[0].date);
                paymentDate.setHours(paymentDate.getHours() - 3);

                var paidToday = paymentDate.toISOString().split('T')[0] == newActualDate.toISOString().split('T')[0];

                if (paidToday) {
                    paymentsToday = parseFloat(paymentsToday) + parseFloat(payment[0].value);
                }
            })
        });

        return paymentsToday;
    } catch (error) {
        return error;
    }
}

module.exports = paymentsToday;