const winston=require('winston');
const mongoose=require('mongoose');

module.exports=function()
{
    mongoose.connect('mongodb://localhost/authentication_db',{useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> winston.info('Connected to MongoDB'));   //pass exception to uncaught exception  
}