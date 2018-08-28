const express = require('express');
const boss  = express.Router();
const User =  require('../models/User')

/* GET home page */
boss.get('/boss', (req, res, next) => {
    res.send('bosspage')
//   res.render('index');
});

boss.get('/viewemployee', (req, res, next) => {
    const { id } = req.params
    console.log(req.params, '------------------')
    User.findById(id).then(result => {
        if (!result) return res.send('No such bear')
        if (result.user.toString() !== req.user._id.toString() && req.user.role !== 'Boss') {
            res.send('NOT YOUR BEAR!')
        }
        res.send("yay ")
    })


    res.send('employee create page')
//   res.render('index');
});

module.exports = boss;
