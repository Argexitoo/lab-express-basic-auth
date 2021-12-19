const { isLoggedIn } = require("../middleware");
const User = require("../models/User.model");
const router = require("express").Router();



/* GET home page */
router.get("/", (req, res, next) => {
  const user = req.session.currentUser;

  res.render("index", {name: user ? user.email : 'Anonimo'});
});

router.get("/main", isLoggedIn,(req, res, next) => {
  res.render('./userFolder/main');
});

router.get("/private", isLoggedIn,(req, res, next) => {
  res.render('./userFolder/private');
});


module.exports = router;
