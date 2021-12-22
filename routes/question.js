const express = require('express')
const router = express.Router()
const Category = require('../models/Category')
const Question = require('../models/Question')
const checkToken = require('../middleware/auth')

router.get('/', async (req, res, next) => {
    try {
        const questions = await Question.find()
        res.json(questions)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const question = await Question.findById({
            _id: req.params.id
        })
        res.json(question)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    const { name, level, listAnswers, correctAnswer, category } = req.body
    try {
        const question = await new Question
        question.name = name
        question.category = category
        question.level = level
        question.listAnswers = listAnswers
        question.correctAnswer = correctAnswer
        await question.save()
        res.json(question)

    } catch (error) {
        next(error)
    }
})

// router.post('/:id', async (req, res, next) => {
//     const { id } = req.params
//     const { name } = req.body
//     try {
//         const category = await Category.findById(id)
//         category.name = name
//         await category.save()
//         res.json(category)
//     } catch (error) {
//         next(error)
//     }
// })

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const question = await Question.remove({
            _id: id
        })
        res.json(question)
    } catch (error) {
        next(error)
    }
})


module.exports = router