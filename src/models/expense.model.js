const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
    {
        sellerId: 'String',
        description: 'String',
        value: 'Decimal',
        date: 'String'
    },
    {
        timestamps: true
    }
);

const decimal2JSON = (v, i, prev) => {
    if (v !== null && typeof v === 'object') {
       if (v.constructor.name === 'Decimal128')
          prev[i] = parseFloat(v);
       else
          Object.entries(v).forEach(([key, value]) => decimal2JSON(value, key, prev ? prev[i] : v));
    }
};

expenseSchema.set('toJSON', {
    transform: (doc, ret) => {
       decimal2JSON(ret);
       return ret;
    }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;