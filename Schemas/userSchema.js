const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    

    dob: {
        type: String,
        
    },

    phoneNumber:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
}, 
{
    timestamps:true
});



const userModel = mongoose.model('Users', userSchema);
module.exports = userModel