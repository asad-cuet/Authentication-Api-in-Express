const mongoose=require('mongoose');
const express=require('express');
const users=require('./routes/users.js');
const app=express();

app.use(express.json());    //***
app.use(express.urlencoded());


//connection
mongoose.connect('mongodb://localhost/authentication_db')
    .then(()=> console.log('DB connected..'))
    .catch(err=> console.log('Could not connected to db..',err));
app.listen(3000, ()=> { console.log("Listening port 3000..."); })

//routes
app.use('/api/users',users); 

