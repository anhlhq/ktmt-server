const express = require('express')
const router = express.Router()
const Category = require('../models/Category')

router.get('/', async (req, res, next) => {
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    const { name } = req.body
    try {
        const category = await new Category
        category.name = name
        await category.save()
        res.json(category)

    } catch (error) {
        next(error)
    }
})

router.post('/:id', async (req, res, next) => {
    const { id } = req.params
    const { name } = req.body
    try {
        const category = await Category.findById(id)
        category.name = name
        await category.save()
        res.json(category)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const category = await Category.remove({
            _id: id
        })
        res.json(category)
    } catch (error) {
        next(error)
    }
})


module.exports = router