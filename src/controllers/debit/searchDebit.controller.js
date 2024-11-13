const debitModel = require('../../models/debit.model');

async function searchDebit(queryString, sellerId) {
    const debit = await debitModel.find({ sellerId: sellerId }).find({ 'customerData.name': { $regex: new RegExp(queryString), $options: 'i' }});
    return debit;
}

module.exports = searchDebit;