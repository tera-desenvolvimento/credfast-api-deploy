const userModel = require('../../models/user.model');

async function authenticate(email, password) {
    try {
        const userLogged = await userModel.findOne({ email: email });

        if (!userLogged) {
            return {
                status: 'error',
                errorId: 'auth_01',
                message: 'USER_NOT_FOUND'
            }
        } else if (userLogged.password !== password) {
            return {
                status: 'error',
                errorId: 'auth_02',
                message: 'PASSWORD_MISMATCH'
            }
        } else if (!userLogged.isActive) {
            return {
                status: 'error',
                errorId: 'auth_03',
                message: 'INACTIVE_SUBSCRIPTION'
            }
        } else {
            return {
                sellerId: userLogged._id,
                userId: userLogged.userId,
                name: userLogged.name,
                email: userLogged.email,
                role: userLogged.role,
                module: userLogged.module,
                phone: userLogged.phone,
                isActive: userLogged.isActive
            }
        }
    } catch (error) {
        return error;
    }
}

module.exports = authenticate;