const winston=require('winston');
const express=require('express');
const app=express();

//extracting all startup
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/handleError')();
require('./startup/config')();


//port
const port=process.env.PORT || 3000;
app.listen(port, ()=> { winston.info(`Listening port ${port}...`); })











