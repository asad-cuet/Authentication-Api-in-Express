const {User,validate}= require('../models/users.js');
const lodash=require('lodash');    //npm i lodash
const bcrypt=require('bcrypt');    //npm i bcrypt
const jwt=require('jsonwebtoken');   
const config=require('config');   
const express=require('express');
const router=express.Router();
const app=express();
const auth= require('../middleware/auth');
const admin= require('../middleware/admin');


module.exports=router;

