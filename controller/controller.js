const UsersModel = require(`../model/user`)
const passport = UsersModel.passport
const Users = UsersModel.Users
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const ejs = require('ejs')




passport.serializeUser(function(Users, cb) {
    process.nextTick(function() {
      cb(null, { id: Users.id, username: Users.username });
    });
  });
  
  passport.deserializeUser(function(Users, cb) {
    process.nextTick(function() {
      return cb(null, Users);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
    Users.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));



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
    if(req.isAuthenticated()){
        res.render('secrets')
        console.log(req.isAuthenticated)
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

const google_auth =  passport.authenticate('google', { scope: ['profile'] })

const google_auth_redirect = passport.authenticate('google', { failureRedirect: '/login' })


module.exports = {
    user_index,
    user_register,
    user_login_page,
    user_register_db,
    user_login,
    user_submit,
    user_logout,
    user_secret,
    google_auth,
    google_auth_redirect
}