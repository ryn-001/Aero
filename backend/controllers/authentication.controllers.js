const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    try{
        const {email,password} = req.body;
        if(!email || !password) return res.status(400).json({message: 'Email and password are required'});

        const user = await User.findOne({email}).select('+password');
        if(!user) return res.status(401).json({message: 'Invalid Email'});
        
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(401).json({message: 'Invalid password'});

        const token = jwt.sign(
            {id: user._id, email: user.email},
            process.env.JWT_SECRET_KEY,
            {expiresIn: '30d'}
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict', 
            maxAge: 30 * 24 * 60 * 60 * 1000 
        })

        return res.status(200).json({
            message: 'Login successful',
            user: { id: user._id, fullname: user.fullname, email: user.email, username: user.username }
        });

    }catch(e){
        console.log(e.message);
        return res.status(500).json({ error: e.message });
    }
}

const logoutUser = async (req,res) => {
    try{
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'Strict'
        });

        return res.status(200).json({message: "User logged out successfully"});
    }catch(e){
        return res.status(500).json({error: e.message});
    }
}

module.exports = {registerUser,loginUser,logoutUser};