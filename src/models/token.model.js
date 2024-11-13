const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'user'
    },
    token: {
        type: 'string',
        required: true
    },
    createdAt: {
        type: 'date',
        default: Date.now(),
        expires: 3600
    }
});

const Token = mongoose.model('token', tokenSchema);

module.exports = Token;