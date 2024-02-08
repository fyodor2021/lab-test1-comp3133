const express = require('express');
const userModel = require('../models/User.js');
const { default: mongoose } = require('mongoose');
const User = require('../models/User.js');
const router = express.Router();

router.route('/user').post(async (req,res) => {
    const userLookup = await userModel.getUserByUsername(req.body.username);
    console.log(userLookup.length)
    if(userLookup.length > 0){
        res.send("user already exists.");
    }else{
        const user = new userModel(req.body);
        user.save();
        res.send("User Created.")
    }
}).get(async (req, res) => {
    const userLookup = await userModel.getUserByUsername(req.params.username);
    if(userLookup.length > 0){
        console.log(found);
    }else{
        res.send("User Not Found.");
    }

})

router.route('/login').post(async (req,res) => {

    const found = await userModel.getUserByUsername(req.body.username);

    if (found && found[0].password == req.body.password){
        
        res.send(found)
        console.log(found)

    }else{
        res.send("user not found")
    }
})


module.exports = router;