const mongoose=require('mongoose');
const Joi=require('joi');
const jwt=require('jsonwebtoken');   
const config=require('config');   


//schema
const userSchema=new mongoose.Schema({
    name:{type:String, required:true, minlength: 5, maxlength:255},
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5, 
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5, 
        maxlength:1024
    },
    isAdmin:Boolean

});

//model method
userSchema.methods.generateAuthToken= function()
{
    const token=jwt.sign({_id:this._id, isAdmin:this.isAdmin},config.get('jwtPrivateKey'));  //, { expiresIn: 31556926 }
    return token;
}

//model
const User=mongoose.model('User',userSchema);



//Validate Input User Data

function validateUser(user)
{
    const schema= Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    });

    return schema.validate(user);

    // return Joi.validate(user,schema);
}


exports.User=User;
exports.validate=validateUser;


