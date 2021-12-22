const express = require('express')
const router = express.Router()
const Category = require('../models/Category')
const Question = require('../models/Question')
const getRandomItem = require('../helpers/getRandomItem')

router.get('/guest', async (req, res, next) => {
    try {
        const normal1 = await Question.find({
            category: '61a9a14118789856d243ad78',
            level: 'normal'
        })
        const normal2 = await Question.find({
            category: '61a9a15318789856d243ad7a',
            level: 'normal'
        })

        const medium1 = await Question.find({
            category: '61a9a14118789856d243ad78',
            level: 'medium'
        })
        const medium2 = await Question.find({
            category: '61a9a15318789856d243ad7a',
            level: 'medium'
        })

        const difficult1 = await Question.find({
            category: '61a9a14118789856d243ad78',
            level: 'difficult'
        })
        const difficult2 = await Question.find({
            category: '61a9a15318789856d243ad7a',
            level: 'difficult'
        })
        const data = getRandomItem(normal1, 5)
            .concat(
                getRandomItem(normal2, 5),
                getRandomItem(medium1, 3),
                getRandomItem(medium2, 3),
                getRandomItem(difficult1, 2),
                getRandomItem(difficult2, 2),
            )
        res.json(
            { count: data.length, data: data }
        )
    } catch (error) {
        next(error)
    }
})

router.get('/member', async (req, res, next) => {
    try {
        const normal1 = await Question.find({
            level: 'normal'
        })
        const medium1 = await Question.find({
            level: 'medium'
        })

        const difficult1 = await Question.find({
            level: 'difficult'
        })
        const data = getRandomItem(normal1, 10)
            .concat(
                getRandomItem(medium1, 6),
                getRandomItem(difficult1, 4),
            )
        res.json(
            { count: data.length, data: data }
        )
    } catch (error) {
        next(error)
    }
})

module.exports = router