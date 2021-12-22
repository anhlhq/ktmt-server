const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { checkToken } = require('../middleware/auth')

router.get('/', async (req, res, next) => {
    const { username } = req.query
    try {
        if (username) {
            const user = await User.findOne({
                username: username
            })
            user && res.json({
                status: 'exist'
            })
        }
        const users = await User.find()
        res.json(users)
    } catch (err) {
        next(err)
    }
})

router.post('/register', async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await new User
        user.username = username
        if (password) {
            await user.hashPassword(password)
        }
        const token = user.generateAuthToken()
        res.json({
            status: 'success',
            user
        })
        await user.save()
    } catch (error) {
        next(error)
    }
})



router.post('/login', async (req, res, next) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({
            username: username
        })
        if (!user) {
            res.json({
                status: 'failed',
                token: ''
            })
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            res.json({
                status: 'failed',
                token: ''
            })
        }
        const token = await user.generateAuthToken()
        res.json({
            status: 'success',
            token: token
        })
    } catch (error) {

    }
});

router.get('/status', checkToken, async (req, res, next) => {
    try {
        const user = await User.findById(req.data._id)
        if (!user) {
            res.json({
                status: "guest",
                role: null
            })
        }
        res.json({
            status: "logged-in",
            role: user.role
        })
    } catch (error) {
        next(error)
    }
})

router.get('/logout', checkToken, async (req, res, next) => {
    try {
        const user = await User.findById(req.data._id)
        user.tokens = []
        await user.save()
        res.json('logged-out')
    } catch (error) {
        next(error)
    }
})

module.exports = router