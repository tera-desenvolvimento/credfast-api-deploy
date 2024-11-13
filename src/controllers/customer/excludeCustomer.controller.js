const customerModel = require('../../models/customer.model');
const listCustomerDebits = require('../debit/listCustomerDebits.controller');

async function excludeCustomer(sellerId, customerId) {
    try {
        var debits = await listCustomerDebits(sellerId, customerId);  

        if (debits.length > 0) {
            return {
                message: "CUSTOMER_HAVE_DEBITS"
            }
        } else {
            await customerModel.findOneAndDelete({ sellerId: sellerId, customerId: customerId });

            return {
                message: "CUSTOMER_EXCLUDED_SUCESSFULLY"
            }
        }
    } catch (error) {
        return error
    }
}

module.exports = excludeCustomer;