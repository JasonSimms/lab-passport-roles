const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

const User = require("../models/User");

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/sign-up", (req, res, next) => {
  res.render("sign-up");
});

router.post("/sign-up", (req, res, next) => {
  const { email, password, role } = req.body;

  const encrypted = bcrypt.hashSync(password, 10);

  new User({ email, password: encrypted, role })
    .save()
    .then(result => {
      res.send("User account was created");
    })
    .catch(err => {
      if (err.code === 11000) {
        return res.render("sign-up", { error: "user exists already" });
      }
      console.error(err);
      res.send("something went wrong");
    });
});

router.get("/sign-in", (req, res, next) => {
  res.render("sign-in");
});

router.post(
  "/sign-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/sign-in",
    failureFlash: true
  })
);

router.use(ensureLogin.ensureLoggedIn("/sign-in"));
// VIEW ALL USERS
router.get("/users", (req, res, next) => {
  User.find({}).then(users => {
    res.send(users);
  });
});

//UPDATE USER INFO

router.get("/updateuser", (req, res) => {
  console.log(req.user._id, "------------------------");
  User.findById(req.user._id).then(user => {
    res.render("userupdate", { user });
  });
});

router.post("/updateuser", (req, res) => {
  console.log("----attempt to update-----", req.user._id);
  const { email,password,role} =req.body
  User.findByIdAndUpdate(
    { _id: req.user._id },
    {
      email,
      password,
      role,
    },
    { new: true }
).then(() => {
      res.redirect("/");
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});
// router.get(
//     '/google',
//     passport.authenticate('google', {
//         scope: [
//             'https://www.googleapis.com/auth/plus.login',
//             'https://www.googleapis.com/auth/plus.profile.emails.read',
//         ],
//     })
// )

// router.get(
//     '/google/cb',
//     passport.authenticate('google', {
//         failureRedirect: '/sign-in',
//         successRedirect: '/',
//     })
// )

router.get("/sign-out", (req, res) => {
  req.logout();
  res.redirect("/sign-in");
});

module.exports = router;
