const mongoose = require("mongoose");

const User = new mongoose.Schema({
    login: String,
    password: String,
    age: Number,
    phone: String,
    email: String
})

module.exports = mongoose.model('Users', User)