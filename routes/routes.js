const express = require('express')
const router = express.Router()
const Controller = require(`../controller/controller`)

router.get('/', Controller.user_index)

router.get('/register', Controller.user_register)

router.get('/login', Controller.user_login_page)

router.post('/register', Controller.user_register_db)

router.post('/login', Controller.user_login)

router.get('/submit', Controller.user_submit)



module.exports = router