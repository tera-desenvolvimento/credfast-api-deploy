const debitModel = require("../../../models/debit.model");
const dateCraft = require('date-craft');

async function paymentsThisMonth(sellerId) {
    try {
        const debits = await debitModel.find({ sellerId:sellerId });
        var paymentsThisMonth = 0;

        var newActualDate = dateCraft.getCurrentDate();
        newActualDate.setHours(newActualDate.getHours() - 3);

        debits.forEach(debit => {
            debit.payments.forEach(payment => {
                var paymentDate = new Date(payment[0].date);
                paymentDate.setHours(paymentDate.getHours() - 3);

                var paidThisMonth = (paymentDate.getMonth() == newActualDate.getMonth()) && (paymentDate.getFullYear() == newActualDate.getFullYear());

                if (paidThisMonth) {
                    //console.log(payment[0].date);
                    paymentsThisMonth = parseFloat(paymentsThisMonth) + parseFloat(payment[0].value);
                }
            })
        });

        return paymentsThisMonth;

    } catch (error) {
        return error;
    }
}

module.exports = paymentsThisMonth;