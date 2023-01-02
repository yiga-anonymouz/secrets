const mongoose = require('mongoose')
const encrypt = require('mongoose-encryption')
const { use } = require('../routes/routes')

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

const secret = "Thisisourlittlesecret"

userSchema.plugin(encrypt, {secret: secret, encryptedFields: ['password']})

const Users = new mongoose.model('user', userSchema)

module.exports = Users