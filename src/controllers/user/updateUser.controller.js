const userModel = require('../../models/user.model');

async function updateUser(userId, key, newvalue) {
    try {
        const user = await userModel.findByIdAndUpdate(
            { _id: userId },
            { [key]: newvalue },
            { new: false }
        )

        if (user) {
            const userUpdated = await userModel.findById(
                { _id: userId }
            );

            return userUpdated;
        }
    } catch (error) {
        return error;
    }
}

module.exports = updateUser;