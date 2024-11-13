const customerModel = require('../../models/customer.model');

async function updateCustomer(customerId, key, newvalue) {
  try {
    const customer = await customerModel.findByIdAndUpdate(
        { _id: customerId },
        { [key]: newvalue },
        { new: false }
    )

    if (customer) {
        const customerUpdated = await customerModel.findById(
            { _id: customerId }
        );

        return customerUpdated;
    }
} catch (error) {
    return error;
}
}

module.exports = updateCustomer;