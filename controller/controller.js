const UsersModel = require(`../model/user`)
const passport = require('passport')
const Users = UsersModel.Users
const ejs = require('ejs')



passport.use(Users.createStrategy());

passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());



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
    Users.register({username: req.body.username}, req.body.password, function(err, user) {
        if(err){
            console.log(err)
            res.redirect('/register')
        }else{
            passport.authenticate("local")(req, res, () => {
                res.redirect('/secrets')
            })
        }
    })

}

const user_login = (req, res) => {
    const user = new Users ({
        username: req.body.username,
        password: req.body.password
    })
   req.login(user, (err) => {
    if(err){
        console.log(err)
    }else{
        passport.authenticate("local")(req, res, () => {
            res.redirect('/secrets')
        })
    }
    })
}

const user_secret = (req , res) => {
    if(req.isAuthenticated){
        res.render('secrets')
    }else{
        res.redirect('/login')
    }
}

const user_submit = (req, res) => {
    res.render('submit')
}

const user_logout = (req , res) => {
    req.logout(err => {
        if(err) console.log(err);
      })
    res.redirect('/')
}
module.exports = {
    user_index,
    user_register,
    user_login_page,
    user_register_db,
    user_login,
    user_submit,
    user_logout,
    user_secret
}