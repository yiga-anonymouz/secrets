require('dotenv').config()
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

const Users = new mongoose.model('user', userSchema)

module.exports = Users