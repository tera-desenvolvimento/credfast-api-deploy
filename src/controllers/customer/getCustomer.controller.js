const customerModel = require('../../models/customer.model');

async function getCustomer(customerId) {
    const customer = await customerModel.findOne({ _id: customerId });

    if (!customer) {
        return {
            message: 'CUSTOMER_NOT_FOUND'
        }
    } else {
        return customer
    }
}

module.exports = getCustomer;