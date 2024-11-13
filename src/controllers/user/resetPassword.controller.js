const userModel = require('../../models/user.model');
const tokenModel = require('../../models/token.model');

const joi = require('joi');

async function resetPassword(userId, token, newPassword) {
    try {
        const passwordSchema = joi.object({ password: joi.string().required() });
        const { error } = passwordSchema.validate({ password: newPassword });

        if (error) {
            return error
        } else {
            const user = await userModel.findById({ _id: userId });

            if (!user) {
                return {
                    status: 'error',
                    message: 'INVALID_OR_EXPIRED_TOKEN'
                }
            } else {
                const userToken = await tokenModel.findOne({ userId, token });

                if (!userToken) {
                    return {
                        status: 'error',
                        message: 'INVALID_OR_EXPIRED_TOKEN'
                    }
                } else {
                    await userModel.findOneAndUpdate(
                        { email: user.email },
                        { password: newPassword}
                    );

                    await tokenModel.findOneAndDelete({ token: token });

                    return {
                        status: 'success',
                        message: 'PASSWORD_RESET_SUCCESSFULLY'
                    }
                }
            }
        }
    } catch (error) {
        return {
            status: 'error',
            message: 'An error occurred while resetting password',
            error: error
        }
    }

}

module.exports = resetPassword;