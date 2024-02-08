const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        required: [true, 'please enter your username'],
        minlength:3,
        unique: true
    },
    firstname: {
        type:String,
        required: [true, 'please enter your firstname'],
        minlength:3,
    },
    lastname: {
        type:String,
        required: [true, 'please enter your lastname'],
        minlength:3,
    },
    password: {
        type:String,
        required: [true, 'please a password'],
        minlength:5,
        trim: true,
        maxlength: 16
    },
    createon:{
        type: Date,
        default: Date.now()
    }
});

UserSchema.statics.getUserByUsername = function(username){
    return this.find({username})
}
UserSchema.statics.getUserByUsernameAndPassword = function(username,password){
    return this.find({username,password})
}
const User = mongoose.model('User', UserSchema)

module.exports = User