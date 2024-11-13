const router = require('express').Router();
const JWT = require('jsonwebtoken');

const createUser = require('../controllers/user/createUser.controller');
const getAllUsers = require('../controllers/user/getAllUsers.controller');
const getUser = require('../controllers/user/getUser.controller');
const authenticate = require('../controllers/user/authenticate.controller');
const activateUser = require('../controllers/user/activateUser.controller');
const deactivateUser = require('../controllers/user/deactivateUser.controller');
const checkSession = require('../controllers/user/checkSession.controller');
const requestPasswordRecovery = require('../controllers/user/requestPasswordRecovery.controller');
const resetPassword = require('../controllers/user/resetPassword.controller');
const updateUser = require('../controllers/user/updateUser.controller');

const validateEmail = require('../modules/validateEmail.module');
const validatePassword = require('../modules/validatePassword.module');
const sendMail = require('../modules/sendMail.module');

router.post('/user/create', (req, res) => {
    const { name, docId, role, module, phone, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        res.json({
            status: 'error',
            errorId: 'register_01',
            message: 'PASSWORD_CONFIRM_MISMATCH'
        })
    } else if (!validateEmail(email)) {
        res.json({
            status: 'error',
            errorId: 'register_02',
            message: 'INVALID_EMAIL_FORMAT'
        })
    } else if (!validatePassword(password)) {
        res.json({
            status: 'error',
            errorId: 'register_03',
            message: 'INVALID_PASSWORD_FORMAT'
        })
    } else {
        createUser(name, docId, role, module, phone, email, password)
            .then(response => {
                if (response.hasOwnProperty('keyValue')) {
                    res.json({
                        status: 'error',
                        errorId: 'register_04',
                        message: Object.keys(response.keyPattern)[0].toUpperCase() + '_ALREADY_REGISTERED',
                        response
                    })
                } else {
                    res.json({
                        status: 'success',
                        message: 'USER_CREATED_SUCCESSFULLY'
                    })
                }
            })
            .catch(err => {
                res.json(err)
            })
    }
});

router.get('/user/list', (req, res) => {
    getAllUsers()
        .then(response => {
            res.json(response);
        })
})

router.post('/user/find', (req, res) => {
    const { userId } = req.body;

    getUser(userId)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.json(err)
        })
})

router.post('/user/auth', (req, res) => {
    const { email, password } = req.body;

    authenticate(email, password)
        .then(response => {
            if (response.status == 'error') {
                res.json(response);
            } else {
                const token = JWT.sign({ id: response.userId }, process.env.SECRET, { expiresIn: '2d' });

                res.json({
                    userData: response,
                    token
                })
            }
        })
        .catch(err => res.json(err))
})

router.post('/user/validateSession', (req, res) => {
    const { token } = req.body;

    checkSession(token)
        .then(response => res.json(response))
        .catch(err => res.json(err))
})

router.post('/user/activate', (req, res) => {
    const { docId } = req.body;

    activateUser(docId)
        .then(response => {
            res.json(response)
        })
        .catch(err => res.json(err))
})

router.post('/user/deactivate', (req, res) => {
    const { docId } = req.body;

    deactivateUser(docId)
        .then(response => {
            res.json(response)
        })
        .catch(err => res.json(err))
})

router.post('/user/sendEmail', (req, res) => {
    const { email, subject, text, html } = req.body;

    sendMail(email, subject, text, html)
        .then(response => {
            res.json(response)
        })
        .catch(err => res.json(err))
})

router.post('/user/requestPasswordRecovery', (req, res) => {
    const { email } = req.body;
    
    requestPasswordRecovery(email)
        .then(response => {
            res.json(response)
        })
        .catch(err => res.json(err))

})

router.post('/user/resetPassword', (req, res) => {
    const { userId, token, newPassword } = req.body;

    resetPassword(userId, token, newPassword)
        .then(response => {
            res.json(response)
        })
        .catch(err => res.json(err))
})

router.post('/user/update', (req, res) => {
    const { userId, key, newvalue } = req.body;

    updateUser(userId, key, newvalue)
        .then(response => {
            res.json(response)
        })
        .catch(err => res.json(err))
})

module.exports = router;