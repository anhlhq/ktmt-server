const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        require: true
    }
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category