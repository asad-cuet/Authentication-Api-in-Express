const winston=require('winston');
module.exports=process.on('uncaughtException',(ex)=>{
    console.log('We got an uncaught exception.');
    winston.error(ex.message, ex);
});