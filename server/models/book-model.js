const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Book = new Schema(
    {
    name: {type: String, required: true},
    images: {type: [String], required: true},
    rating: {type: Number, required: true},
    }
)

module.exports = mongoose.model('book', Book)