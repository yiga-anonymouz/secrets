const Users = require(`../model/user`)
const ejs = require('ejs')
const bcrypt = require('bcrypt')
const saltRounds = 10


const user_index = (req , res) => {
    res.render('home')
}

const user_register = (req , res) => {
    res.render('register')
}

const user_login_page = (req , res) => {
    res.render('login')
}

const user_register_db = (req , res) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt)
    const userDetails = new Users({
        email: req.body.username,
        password: hash
    })

    userDetails.save()
    .then(() => {
        res.render('secrets')
    })
    .catch((err) => {
        console.log(err)
    })
}

const user_login = (req, res) => {
    const email = req.body.username
    const password = req.body.password

    Users.findOne({email: email})
    .then((Userfound) => {
        if(Userfound){
            if(bcrypt.compareSync(password, Userfound.password)){
                res.render('secrets')
            }
        }
    })
    .catch((err) => {
        console.log(err)
    })
}

const user_submit = (req, res) => {
    res.render('submit')
}

const user_logout = (req , res) => {
    res.render('home')
}
module.exports = {
    user_index,
    user_register,
    user_login_page,
    user_register_db,
    user_login,
    user_submit,
    user_logout
}