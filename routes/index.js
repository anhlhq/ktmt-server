const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    try {
        res.json()
    } catch {

    }
})

router.use('/auth', require('./auth'))
router.use('/category', require('./category'))
router.use('/question', require('./question'))
router.use('/test', require('./test'))
module.exports = router