require('dotenv').config()
const mongoose = require('mongoose')
const encrypt = require('mongoose-encryption')


const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password']})

const Users = new mongoose.model('user', userSchema)

module.exports = Users