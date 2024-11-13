const customerModel = require('../../models/customer.model');

async function createCustomer(sellerId, name, businessModel, address, docId, phone, route) {
    try {
        var customers = await customerModel.find();
        var customerId;

        if (customers.length === 0) {
            customerId = "customer_00000"
        } else {
            let lastId = customers[customers.length - 1].customerId;
            customerId = 'customer_' + Math.abs((parseInt(lastId.split("_")[1]) + 1)).toString().padStart(5, '0');
        }

        const customerCreated = await customerModel.create(
            {
                customerId,
                sellerId,
                name,
                businessModel,
                address,
                docId,
                phone,
                route,
                isActive: true
            }
        );

        return customerCreated;
    } catch (error) {
        return error
    }
}

module.exports = createCustomer;