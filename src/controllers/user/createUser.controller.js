const userModel = require('../../models/user.model');

async function createUser(name, docId, role, module, phone, email, password) {
    try {
        var users = await userModel.find();
        var userId;

        if (users.length === 0) {
            userId = "user_00000"
        } else {
            let lastId = users[users.length - 1].userId;
            userId = 'user_' + Math.abs((parseInt(lastId.split("_")[1]) + 1)).toString().padStart(5, '0');
        }

        const userCreated = await userModel.create(
            {
                userId,
                docId,
                name,
                role,
                module,
                phone,
                email,
                password,
                isActive: false
            }
        );

        return userCreated;
    } catch (error) {
        return error;
    }
}

module.exports = createUser;