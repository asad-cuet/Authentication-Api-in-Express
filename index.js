const mongoose=require('mongoose');
const express=require('express');
const app=express();
const config=require('config');

const users=require('./routes/users.js');
const auth=require('./routes/auth.js');

app.use(express.json());    //***for post,put request
app.use(express.urlencoded());


//commenting for testing
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

//routes
app.use('/api/users',users); 
app.use('/api/auth',auth); 

