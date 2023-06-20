require('express-async-errors');   // for http error
require('winston-mongodb');
const winston=require('winston');

module.exports=function()
{
    //logging error
        //to logfile
        winston.add(new winston.transports.File({ filename: 'logfile.log' }));  //creates a error logfile
        //to database
        winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/authentication_db' }));  //insert error


    //For uncaught exception, which is out of http request
        winston.exceptions.handle(
            new winston.transports.Console({colorize:true, prettyPrint:true}),
            new winston.transports.File({filename:'uncaughtExceptions'})
        );

    //for promise rejection error
        process.on('unhandledRejection',(ex)=>{
            throw ex;    //exception passing to handleExceptions
        });
}