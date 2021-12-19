
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const router = require("express").Router();


const saltRounds = 10;

router.get("/sign-up", (req,res,next) => {
    res.render("sign-up")
});

router.post("/sign-up", (req,res,next) => {
    const {email,password} = req.body;
    
    if (email === '' || password === '') {
        res.render('sign-up', {
          errorMessage: 'Please enter both, email and password to sign up.'
        });
        return;
      }

    User.findOne({email: email})
    .then((user) => {
        if (user) {
            console.log("Usuario Repetido")
            return res.render("sign-up" , {errorMessage: "User already exists"})
        }
    })

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt)

    User.create({
        email,
        hashedPassword,
    })
    .then((user) => {
        console.log("Usuario creado")
        res.redirect("/")
    })
    .catch((error) => {
        console.log("error:",error)
    })
})

router.get("/login", (req,res,next) => {
    res.render("login")
});

router.post("/login", (req,res,next) => {
    const {email,password} = req.body;

    if (email === '' || password === '') {
        res.render('login', {
          errorMessage: 'Please enter both, email and password to login.'
        });
        return;
      }
    
    User.findOne({email})
    .then((dbUser) => {
        if (!dbUser) {
            return res.render('login',{errorMessage: 'User not found'})
        }
        const {_id,hashedPassword} = dbUser;
        if (bcrypt.compareSync(password, hashedPassword)) {
        req.session.currentUser = {
            _id,
            email,
        }
        res.redirect('/')
    }
    return res.render('login', {errorMessage: 'Password incorrect'})
    })
    .catch((e) => {
        console.log("error:",e)
    })
});

module.exports = router











