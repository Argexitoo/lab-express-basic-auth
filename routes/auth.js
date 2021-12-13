
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const router = require("express").Router();


const saltRounds = 10;

router.get("/sign-up", (req,res,next) => {
    res.render("sign-up")
});

router.post("/sign-up", (req,res,next) => {
    const {email,password} = req.body;

    if(password.length == 0 ) {
        return res.render("sign-up", {passwordMessage: "You need a password"})
    }

    if(email.length == 0 ) {
        return res.render("sign-up", {emailMessage: "You need a email"})
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

module.exports = router











