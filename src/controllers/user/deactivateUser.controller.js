const userModel = require('../../models/user.model');

async function deactivateUser(docId) {
    try {
        const user = await userModel.findOneAndUpdate(
            { docId: docId },
            { isActive: false },
            { new: false }
        )

        if (user) {
            const userInactive = await userModel.findOne(
                { docId: docId }
            );

            return userInactive;
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

module.exports = deactivateUser;