const mongoose=require('mongoose');
const Joi=require('joi');


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
    }

});

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


