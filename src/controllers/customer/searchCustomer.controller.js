const customerModel = require('../../models/customer.model');

async function searchCustomer(queryString, sellerId) {
    const customer = await customerModel.find({ sellerId: sellerId }).find({ name: { $regex: new RegExp(queryString), $options: 'i' }});
    return customer;
}

module.exports = searchCustomer;