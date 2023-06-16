require('express-async-errors');
require('winston-mongodb');
const error=require('./middleware/error');
const winston=require('winston');
const mongoose=require('mongoose');
const express=require('express');
const app=express();
const config=require('config');

const users=require('./routes/users.js');
const auth=require('./routes/auth.js');

winston.add(new winston.transports.File({ filename: 'logfile.log' }));  //creates a error logfile
winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/authentication_db' }));  //insert error
//For uncaught exception
process.on('uncaughtException',(ex)=>{
    console.log('We got an uncaught exception.');
    winston.error(ex.message);
});


//creating a error out of request.
// throw new Error('Uncaught Error.');



//commenting for testing
// set value by: set 2723_jwtPrivateKey=1234
// if(!config.get('jwtPrivateKey'))
// {
//     console.log('Error: jwtPrivateKey not found.');
//     process.exit(1);
// }

//connection
mongoose.connect('mongodb://localhost/authentication_db')
    .then(()=> console.log('DB connected..'))
    .catch(err=> console.log('Could not connected to db..',err));
app.listen(3000, ()=> { console.log("Listening port 3000..."); })


app.use(express.json());    //***for post,put request
// app.use(express.urlencoded());


//routes
app.use('/api/users',users); 
app.use('/api/auth',auth); 

//error middleware
app.use(error);

