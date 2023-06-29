const {User,validate}= require('../models/users.js');
const jwt=require('jsonwebtoken');   
const config=require('config');   
const lodash=require('lodash');   
const bcrypt=require('bcrypt');    
const express=require('express');
const router=express.Router();
const app=express();
const Joi=require('joi');
const auth= require('../middleware/auth');
const admin= require('../middleware/admin');
const errorHandler= require('../middleware/errorHandler');  //this can be done by express-async-errors package



//registration
router.post('/register',async(req,res)=> {         
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

    try {
        user= new User(lodash.pick(req.body,['name','email','password']));
        const salt=await bcrypt.genSalt(10);
        const hashed= await bcrypt.hash(user.password,salt);
    
        user.password=hashed;
        await user.save();
    
        // res.send(lodash.pick(user,['_id','name','email']));
        
        //sending token in header
        const token=user.generateAuthToken();
        res.header('x-auth-token',token).send(lodash.pick(user,['_id','name','email']));
    }
    catch(ex) {
        next(ex);  
    }


});



//login
router.post('/login',async(req,res)=> {         
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


//makin guard by middleware
router.get('/me',auth,errorHandler(async(req,res,next)=> {    //errorHandler running code inside try block. 
                                                              

    const user=await User.findById(req.user._id).select('-password');
    res.send(user);
 
    
}));

//multiple middleware
// router.get('/me',[auth,admin],async(req,res)=> {    }); 




//logout
router.get('/logout',auth,errorHandler(async(req,res)=> {    //errorHandler running code inside try block. 
    return res.send(200)         
}));

function validateUser(req)
{
    const schema= Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    });

    return schema.validate(req);
}

module.exports=router;

