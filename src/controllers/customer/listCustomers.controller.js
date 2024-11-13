const customerModel = require("../../models/customer.model");

async function listCustomers(sellerId) {
    try {
        const customers = await customerModel.find({sellerId: sellerId});

        return customers;
    } catch (error) {
        return error
    }
}

module.exports = listCustomers;