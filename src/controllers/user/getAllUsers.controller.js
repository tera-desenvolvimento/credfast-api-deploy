const userModel = require('../../models/user.model');

async function getUsers() {
    try {
        const users = await userModel.find();
        return users;
    } catch (error) {
        return error
    }
}

module.exports = getUsers