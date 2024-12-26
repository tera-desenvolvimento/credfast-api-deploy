const debitModel = require("../../models/debit.model");
const dateCraft = require("date-craft");

async function allDebitsThisMonth(sellerId) {
    try {
        const debits = await debitModel.find({ sellerId:sellerId });
        var totalValue = 0;
        var debitsThisMonth = 0;

        var newActualDate = dateCraft.getCurrentDate();
        newActualDate.setHours(newActualDate.getHours() - 3);

        debits.forEach(debit => {
            var debitDate = new Date(debit.firstPaymentDate);
            debitDate.setHours(debitDate.getHours() + 8)

            var createdThisMonth = debitDate.getMonth() == newActualDate.getMonth();

            if (createdThisMonth) {
                totalValue = parseFloat(totalValue) + parseFloat(debit.totalValue);
            }
        });

        debitsThisMonth = totalValue;

        return debitsThisMonth;

    } catch (error) {
        return error;
    }
}

module.exports = allDebitsThisMonth;