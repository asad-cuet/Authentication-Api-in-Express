const express=require('express');

//Model routes
    const users=require('../routes/users.js');
    const auth=require('../routes/auth.js');
    const error=require('../middleware/error');

module.exports=function(app)
{
    //***for post,put request
        app.use(express.json());    
        // app.use(express.urlencoded());

    //routes
        app.use('/api/users',users); 
        app.use('/api/auth',auth); 

    //error middleware
        app.use(error);
}