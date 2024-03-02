var express = require('express');
var router = express.Router();
const userModel = require('./users');
const postModel = require('./posts');
const localStrategy = require('passport-local');
const passport = require('passport');
passport.use(new localStrategy(userModel.authenticate()));


//middlware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

//conditional rendering
function loggedInOrNot(req, res, next) {
  res.locals.loggedInUser = req.user || null;
  next();
};


/* GET home page. */
router.get('/', loggedInOrNot, function (req, res) {
  res.render('index');
});

//sign up route
router.post('/signup', function (req, res) {
  const data = new userModel({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    contact: req.body.contact,
  });
  console.log("------------", data);
  userModel.register(data, req.body.password)
    .then(function () {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      })
    })
})

router.get('/signup',loggedInOrNot, function (req, res) {
  res.render("signup");
});


//login route
router.post('/login', passport.authenticate("local",{
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,
}), function (req, res, next) {
  
});

router.get('/login', loggedInOrNot, function (req, res) {
  console.log(req.flash("error"));
  res.render("login");
});


//logout route:
router.get('/logout', function (req, res) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// Profile route 
router.get('/profile', isLoggedIn, loggedInOrNot, async function (req, res) {
  const user = await userModel.findOne({username: req.session.passport.user}).populate('posts');
  res.render("profile", {user});
});

module.exports = router;
