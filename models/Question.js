const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    level: {
        type: String,
        default: 'normal'
    },
    listAnswers: [
        {
            id: {
                type: Number
            },
            answer: {
                type: String
            }
        }
    ],
    correctAnswer: {
        type: Number,
        require: true
    }
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question