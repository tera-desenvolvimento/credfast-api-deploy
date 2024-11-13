const debitModel = require('../../models/debit.model');

async function getDebit(debitId) {
    const debit = await debitModel.findOne({ debitId: debitId });

    if (!debit) {
        return {
            message: 'DEBIT_NOT_FOUND'
        }
    } else {
        return debit
    }
}

module.exports = getDebit;