const mongoose = require("mongoose");

const Book = new mongoose.Schema({
    name: String,
    pages: Number,
    userId: String,
    username: String
})

module.exports = mongoose.model('Books', Book)