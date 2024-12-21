const debitModel = require('../../models/debit.model');

async function removeDebit(debitId) {
    const debit = await debitModel.findOne({ debitId: debitId });
    let payments = debit.payments;

    if (!debit) {
        return {
            errorId: "error_001",
            message: 'DEBIT_NOT_FOUND'
        };
    } else if (payments.length !== 0) {
        return {
            errorId: "error_002",
            message: 'DEBIT_HAS_PAYMENTS'
        };
    } else {
        const debitRemoved = await debitModel.findOneAndDelete({ debitId: debitId });
        return {
            message: 'DEBIT_REMOVED_SUCESSFULLY',
            debit: debitRemoved
        }
    }
}

module.exports = removeDebit;