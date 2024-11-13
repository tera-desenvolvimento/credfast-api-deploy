const debitModel = require("../../../models/debit.model");
const dateCraft = require('date-craft');

async function paymentsThisWeek(sellerId) {
    try {
        const debits = await debitModel.find({ sellerId:sellerId });
        var paymentsThisWeek = 0;

        var newActualDate = dateCraft.getCurrentDate();
        newActualDate.setHours(newActualDate.getHours() - 3);
        var startOfWeek = dateCraft.getStartOfWeek(newActualDate);
        var endOfWeek = dateCraft.getEndOfWeek(newActualDate);

        debits.forEach(debit => {
            debit.payments.forEach(payment => {
                var paidThisWeek = payment[0].date.split('T')[0] >= startOfWeek.toISOString().split('T')[0] && payment[0].date.split('T')[0] <= endOfWeek.toISOString().split('T')[0];

                if (paidThisWeek) {
                    paymentsThisWeek = parseFloat(paymentsThisWeek) + parseFloat(payment[0].value);
                }
            })
        });

        return paymentsThisWeek;
    } catch (error) {
        return error;
    }
}

module.exports = paymentsThisWeek;