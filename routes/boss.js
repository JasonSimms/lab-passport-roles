const express = require("express");
const boss = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

/* GET BOSS CREATE PAGE */
boss.get("/boss", (req, res, next) => {
  if (req.user.role !== "Boss") {
    res.send("no way!");
  } else next();
});

boss.get("/boss", (req, res, next) => {
  // res.send('bosspage')
  res.render("bossemployeecreate");
});

boss.post("/boss/create", (req, res, next) => {
  console.log("attempt to create -----------------");
  console.log(req.body);
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

// DELETEPAGE

boss.get("/boss/delete", (req, res, next) => {
    if (req.user.role !== "Boss") {
      res.send("no way!");
    } else next();
  });

boss.get("/boss/delete", (req, res, next) => {
  // res.send('bosspage')
  res.render("bossdeleteemployee");
});

boss.post("/boss/delete", (req, res, next) => {
  console.log("attempt to delete -----------------");
//   const { email } = req.body;
  console.log(req.body.email);
//   const encrypted = bcrypt.hashSync(password, 10);
  User.findOneAndRemove(
    {email: req.body.email}).then(data => {
        console.log(data, '-----beeeppppp---')
    //   res.redirect("/");
    })
  });

// boss.get('/viewemployee', (req, res, next) => {
//     const { id } = req.params
//     console.log(req.params, '------------------')
//     User.findById(id).then(result => {
//         if (!result) return res.send('No such bear')
//         if (result.user.toString() !== req.user._id.toString() && req.user.role !== 'Boss') {
//             res.send('NOT YOUR BEAR!')
//         }
//         res.send("yay ")
//     })

//     res.send('employee create page')
// //   res.render('index');
// });

module.exports = boss;
