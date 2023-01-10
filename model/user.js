require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const passportLocalMongoose = require('passport-local-mongoose');
const app = express()

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

userSchema.plugin(passportLocalMongoose);

const Users = new mongoose.model('user', userSchema)

passport.use(Users.createStrategy());



module.exports = {
  Users,
  passport,
  passportLocalMongoose,
  session
}