const debitModel = require('../../models/debit.model');

async function filterDebits(sellerId, initialDate, finalDate, filterType) {
    try {
        const debits = await debitModel.find({sellerId: sellerId});
        var filteredPayments = [];
        var totalValue = 0;

        var iniDate = new Date(initialDate);
        var finDate = new Date(finalDate);

        if(filterType === "payment") {
            debits.forEach(debit => {
                debit.payments.forEach(payment => {
                    var paymentDate = new Date(payment[0].date);
                    paymentDate.setHours(paymentDate.getHours() - 3);
    
                    if (paymentDate >= iniDate && paymentDate <= finDate) {
                        totalValue = parseFloat(totalValue) + parseFloat(payment[0].value);
    
                        var paymentInfo = {
                            clientName: debit.customerData.name,
                            paymentDate: payment[0].date,
                            paymentValue: payment[0].value,
                            paymentIndex: payment[0].index
                        }
    
                        filteredPayments.push(paymentInfo);
                    }
                })
            })
        } else if (filterType === "debit") {
            debits.forEach(debit => {
                var debitDate = new Date(debit.firstPaymentDate);
                debitDate.setHours(debitDate.getHours() - 3);
    
                if (debitDate >= iniDate && debitDate <= finDate) {
                    totalValue = parseFloat(totalValue) + parseFloat(debit.originalValue);
    
                    var debitInfo = {
                        clientName: debit.customerData.name,
                        debitDate: debit.firstPaymentDate,
                        debitValue: debit.originalValue
                    }
    
                    filteredPayments.push(debitInfo);
                }
            })
        }

        return {
            payments: filteredPayments,
            totalValue: totalValue
        }

    } catch (error) {
        return error;
    }
}

module.exports = filterDebits;