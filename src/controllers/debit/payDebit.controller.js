const debitModel = require('../../models/debit.model');

async function payDebit(debitId, paidValue, paymentMethod) {
    try {
        // Instanciando a dívida
        const debit = await debitModel.findOne({debitId: debitId});
        let payments = debit.payments;
        let isQuited = false;
        
        // Criando o pagamento
        var payment = {
            index: payments.length + 1,
            date: new Date().toISOString(),
            paymentMethod: paymentMethod,
            value: paidValue
        }

        // Gravando o pagamento
        payments.push(payment);

        // Calculando o valor restante
        let valueRemaing = debit.toJSON().valueRemaing;

        var newValueRemaing = valueRemaing - paidValue;

        if (debit.paymentsRemaing > 0) {
            var paymentsRemaing = debit.paymentsRemaing - 1;
        }

        // Testando se a dívida já está quitada
        if (newValueRemaing === 0) {
            isQuited = true;
        }

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

module.exports = payDebit;