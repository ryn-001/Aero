const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    fullname:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    username:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 5,
        maxlength: 10
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 6
    }
}, {timestamps: true});


userSchema.pre('save', async function () {
    if(!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password);
}

const User = mongoose.model('User',userSchema);
module.exports = {User};