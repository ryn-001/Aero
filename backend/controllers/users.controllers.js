const bcrypt = require('bcrypt');
const {User} = require('../models/users.models');

const registerUser = async (req,res) => {
    try{
        const {fullname,username,email,password} = req.body;

        if(!fullname || !username || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        if(await User.findOne({email})){
            return res.status(409).json({
                message: 'User already exist with the email',
                email
            })
        }

        if(await User.findOne({username})){
            return res.status(409).json({
                message: 'User already exist with the username',
                username
            })
        }

        const newUser = await User.create({
            fullname, username, email, password
        })

        return res.status(201).json({
            message: 'User created successfully',
            user: newUser
        })

    }catch(e){
        console.log(e);

        if (e.name === 'ValidationError') {
            return res.status(400).json({
                message: Object.values(e.errors)[0].message
            });
        }
        
        return res.status(500).json({error: e.message});
    }
}

const loginUser = async (req,res) => {
    
}

module.exports = {registerUser,loginUser};