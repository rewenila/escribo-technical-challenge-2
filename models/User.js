const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    phone: {number: String, ddd: String},
    date_creation: String,
    date_update: String,
    last_login: String
})

module.exports = User