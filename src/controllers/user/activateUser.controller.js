const userModel = require('../../models/user.model');

async function activateUser(docId) {
    try {
        const user = await userModel.findOneAndUpdate(
            { docId: docId },
            { isActive: true },
            { new: false }
        )

        if (user) {
            const userActive = await userModel.findOne(
                { docId: docId }
            );

            return userActive;
        } else {
            return {
                status: "error",
                message: "USER_NOT_FOUND"
            }
        }
    } catch (error) {
        return error;
    }
}

module.exports = activateUser;