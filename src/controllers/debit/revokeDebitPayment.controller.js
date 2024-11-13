const debitModel = require('../../models/debit.model');

async function revokeDebitPayment(debitId, paymentIndex) {
    try {
       const debit = await debitModel.findOne({debitId: debitId});
       const index = paymentIndex - 1;
       const payments = debit.payments;
       const valueToReturn = payments[index][0].value;
       var isQuited;

       if (debit.isQuited) {
        isQuited = false;
       }
       
       payments.splice(index, 1);

       var newIndex = 0;

       payments.forEach(payment => {
            payment[0].index = newIndex + 1;
            newIndex++;
       })

       const newValueRemaing = parseInt(debit.valueRemaing) + valueToReturn;
       const paymentsRemaing = parseInt(debit.paymentsRemaing) + 1;

       // Atualizando os valores da dívida
       const updateDebit = await debitModel.findOneAndUpdate(
            { debitId: debitId },
            { 
                payments: payments,
                valueRemaing: newValueRemaing,
                paymentsRemaing: paymentsRemaing,
                isQuited: isQuited
            },
            { new: false }
        );

        const debitUpdated = await debitModel.findOne({debitId: debitId});

        return debitUpdated;

    } catch (error) {
        return error;
    }
}

module.exports = revokeDebitPayment;