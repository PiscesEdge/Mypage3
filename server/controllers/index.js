let express= require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//create the user model instance
let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) =>{
    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayAboutPage = (req, res, next) =>{
    res.render('about', {title: 'About', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayProjectsPage = (req, res, next) =>{
    res.render('projects', {title: 'Projects', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayServicesPage = (req, res, next) =>{
    res.render('services', {title: 'Services', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayContactusPage = (req, res, next) =>{
    res.render('contactus', {title: 'Contact Us', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayLoginPage = (req, res, next) => {
    //check if user is already logged in
    if(!req.user)
    {
        res.render('auth/login', 
        {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName: ''
        })
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
     passport.authenticate('local',
     (err, user, info) => {
       //server err
        if (err)
        {
            return next(err);
        }
        //is there user login err
        if(!user)
        {
            req.flash('loginMessage', 'Authentcation Error');
            return res.redirect('/login');
        }
        req.login(user, (err)=> {
            //server err
            if(err)
            {
                return next(err);
            }
            return res.redirect('/contact-list');
        });
     })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName: ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
      //instanciate a user object
      let newUser = new User({
        username: req.body.username,
        //password:req.body.passsword
        email: req.body.email,
        displayName: req.body.displayName
      });

    User.register(newUser, req.body.password, (err)=>{
            if (err)
            {
                console.log("Error: Inserting New User");
                if(err.name == "UserExistsError")
                {
                    req.flash(
                        'registerMessage',
                        'Registeration Error: User Already Exists'
                    );
                    console.log('Error: User Already Exists')
                }
                return res.render('auth/register',
                {
                    title: 'Register',
                    messages: req.flash('registerMessage'),
                    displayName: req.user ? req.user.displayName: ''
                });
            }
            else
            {
                //if no erroe, then registeration is successful

                //redirect user and authenticate them
                return passport.authenticate('local')(req, res, () => {
                    res.redirect('/contact-list')
                });
            }
        });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');

}
