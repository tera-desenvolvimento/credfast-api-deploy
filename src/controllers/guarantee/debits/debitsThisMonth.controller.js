const debitModel = require("../../../models/debit.model");
const dateCraft = require('date-craft');

async function debitsThisMonth(sellerId) {
    try {
        const debits = await debitModel.find({ sellerId:sellerId });
        var debitsThisMonth = 0;

        var newActualDate = dateCraft.getCurrentDate();
        newActualDate.setHours(newActualDate.getHours() - 3);

        debits.forEach(debit => {
            var createdThisMonth = new Date(debit.firstPaymentDate).getMonth() == newActualDate.getMonth();

            if (createdThisMonth) {
                debitsThisMonth = parseFloat(debitsThisMonth) + parseFloat(debit.originalValue);
            }
        })

        return debitsThisMonth;
    } catch (error) {
        return error;
    }
}

module.exports = debitsThisMonth;