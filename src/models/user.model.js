const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        userId: {
            type: "String",
            unique: true
        },
        docId: {
            type: 'String',
            unique: true
        },
        name: 'String',
        role: 'String',
        module: 'Array',
        phone: 'String',
        email: {
            type: "String",
            unique: true
        },
        firstBalance: 'Decimal',
        password: 'String',
        isActive: 'Boolean'
    },
    { timestamps: true }
);

const decimal2JSON = (v, i, prev) => {
    if (v !== null && typeof v === 'object') {
       if (v.constructor.name === 'Decimal128')
          prev[i] = parseFloat(v);
       else
          Object.entries(v).forEach(([key, value]) => decimal2JSON(value, key, prev ? prev[i] : v));
    }
};

userSchema.set('toJSON', {
    transform: (doc, ret) => {
       decimal2JSON(ret);
       return ret;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;