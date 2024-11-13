const mongoose = require('mongoose');

const dailyCashSchema = new mongoose.Schema(
    {
        sellerId: 'String',
        date: 'String',
        initialValue: 'Decimal',
        totalEntries: 'Decimal',
        totalCreditOutflow: 'Decimal',
        totalExpenses: 'Decimal',
        totalBalance: 'Decimal',
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

dailyCashSchema.set('toJSON', {
    transform: (doc, ret) => {
       decimal2JSON(ret);
       return ret;
    }
});

const DailyCash = mongoose.model('DailyCash', dailyCashSchema);

module.exports = DailyCash;