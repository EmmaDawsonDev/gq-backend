const { Unauthorized } = require('../errors/index')
const User = require('../models/userModel') 

const authToken = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        throw new Unauthorized()
    }
    const token = authorization.replace('Bearer ', '')
    const user = User.validateToken(token) // Create this on the model

    req.user = user

    next()

}

module.exports = authToken