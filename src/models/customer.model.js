const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
    {
        customerId: {
            type: 'String',
            unique: true
        },
        sellerId: 'String',
        name: 'String',
        businessModel: 'String',
        address: 'Object',
        docId: 'String',
        phone: 'String',
        route: 'Number',
        isActive: 'Boolean'
    },
    { timestamps: true }
);

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;