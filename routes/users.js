const {User,validate}= require('../models/users.js');
const lodash=require('lodash');    //npm i lodash
const bcrypt=require('bcrypt');    //npm i bcrypt
const express=require('express');
const router=express.Router();
const app=express();



router.post('/',async(req,res)=> {         
    const {error}=validate(req.body);
    if(error)
    {
        return res.status(400).send(error.details[0].message);
    }

    console.log('Body',req.body.email);

    let user=await User.findOne({email:req.body.email});
    if(user)
    {
        return res.status(400).send('Email already exists.');
    }

    // user= new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    // });
    // await user.save();
    // res.send({
    //     name:user.name,
    //     email:user.email
    // });

    //or,

    user= new User(lodash.pick(req.body,['name','email','password']));
    const salt=await bcrypt.genSalt(10);
    const hashed= await bcrypt.hash(user.password,salt);

    user.password=hashed;
    await user.save();

    res.send(lodash.pick(user,['_id','name','email']));
});



module.exports=router;

