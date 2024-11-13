const debitModel = require("../../../models/debit.model");
const dateCraft = require('date-craft');

async function debitsToday(sellerId) {
    try {
        const debits = await debitModel.find({ sellerId:sellerId });
        var debitsToday = 0;

        var newActualDate = dateCraft.getCurrentDate();
        newActualDate.setHours(newActualDate.getHours() - 3);

        debits.forEach(debit => {
            var debitDate = new Date(debit.firstPaymentDate);

            var givedToday = debitDate.toISOString().split('T')[0] == newActualDate.toISOString().split('T')[0];

            if (givedToday) {
                debitsToday = parseFloat(debitsToday) + parseFloat(debit.originalValue);
            }
        });

        return debitsToday;
    } catch (error) {
        return error;
    }
}

module.exports = debitsToday;