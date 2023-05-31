const {User}= require('../models/users.js');
const jwt=require('jsonwebtoken');   
const config=require('config');   
const lodash=require('lodash');   
const bcrypt=require('bcrypt');    
const express=require('express');
const router=express.Router();
const app=express();
const Joi=require('joi');



router.post('/',async(req,res)=> {         
    const {error}=validateUser(req.body);
    if(error)
    {
        return res.status(400).send(error.details[0].message);
    }

    console.log('Body',req.body.email);

    let user=await User.findOne({email:req.body.email});
    if(!user)
    {
        return res.status(400).send('Invalid Email or Password.');
    }

    const validPassword=await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) 
    {
        return res.status(400).send('Invalid Email or Password.');
    }

    const token=user.generateAuthToken();

    res.send(token);

});

function validateUser(req)
{
    const schema= Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    });

    return schema.validate(req);
}

module.exports=router;

