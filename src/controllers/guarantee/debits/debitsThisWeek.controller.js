const debitModel = require("../../../models/debit.model");
const dateCraft = require('date-craft');

async function debitsThisWeek(sellerId) {
    try {
        const debits = await debitModel.find({ sellerId:sellerId });
        var debitsThisWeek = 0;

        var newActualDate = dateCraft.getCurrentDate();
        newActualDate.setHours(newActualDate.getHours() - 3);
        
        var startOfWeek = dateCraft.getStartOfWeek(newActualDate);
        var endOfWeek = dateCraft.getEndOfWeek(newActualDate);

        debits.forEach(debit => {
            var createdThisWeek = debit.firstPaymentDate.split('T')[0] >= startOfWeek.toISOString().split('T')[0] && debit.firstPaymentDate.split('T')[0] <= endOfWeek.toISOString().split('T')[0];

            if (createdThisWeek) {
                debitsThisWeek = parseFloat(debitsThisWeek) + parseFloat(debit.originalValue);
            }
        })

        return debitsThisWeek;
    } catch (error) {
        return error;
    }
}

module.exports = debitsThisWeek;