const Users = require(`../model/user`)
const ejs = require('ejs')


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
    const userDetails = new Users({
        email: req.body.username,
        password: req.body.password
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
            if(Userfound.password === password){
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

module.exports = {
    user_index,
    user_register,
    user_login_page,
    user_register_db,
    user_login,
    user_submit
}