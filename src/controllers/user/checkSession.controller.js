const JWT = require('jsonwebtoken');
const userModel = require('../../models/user.model');

async function checkSession(token) {
    try {
        const decoded = JWT.verify(token, process.env.SECRET);
        const userLogged = await userModel.findOne({ "userId": decoded.id });

        if (!userLogged) {
            return {
                status: 'error',
                errorId: 'session_01',
                message: 'USER_NOT_FOUND'
            }
        }

        return {
            userId: userLogged.userId,
            name: userLogged.name,
            email: userLogged.email,
            role: userLogged.role,
            modules: userLogged.module,
            phone: userLogged.phone,
            isActive: userLogged.isActive
        }
    } catch (error) {
        return error;
    }
}

module.exports = checkSession;