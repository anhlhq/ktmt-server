const jwt = require('jsonwebtoken')
const User = require('../models/User')
const checkToken = async (req, res, next) => {
    try {
        const header = req.header('Authorization')
        if (!header) {
            res.json('guest')
        }
        const token = header.replace('Bearer ', '')
        req.data = jwt.verify(token, process.env.JWT_KEY)
        req.token = token
        next()
    } catch (error) {
        next(error)
    }
}
module.exports = {
    checkToken
}