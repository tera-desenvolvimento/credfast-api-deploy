const userModel = require('../../models/user.model');
const tokenModel = require('../../models/token.model');

const crypto = require('crypto');
const joi = require('joi');

async function requestPasswordRecovery(email) {
    try {
        const emailSchema = joi.object({
            email: joi.string().email().required()
        });

        const { error } = emailSchema.validate({ email: email });

        if (error) {
            return {
                status: 'error',
                message: 'Invalid email provided'
            }
        } else {
            const user = await userModel.findOne({ email: email });

            if (!user) {
                return {
                    status: 'error',
                    message: 'user not found with given email'
                }
            } else {
                let token = await tokenModel.findOne({ userId: user._id });

                if (!token) {
                    token = await new tokenModel({
                        userId: user._id,
                        token: crypto.randomBytes(32).toString("hex")
                    }).save();
                }

                return {
                    userId: user._id,
                    userName: user.name,
                    token: token.token
                }

            }
        }
    } catch (error) {
        return {
            status: 'error',
            message: 'An error occurred while trying to recover your password',
            error: error
        }
    }
}

module.exports = requestPasswordRecovery;