const joi = require('joi');

const registerSchema = joi.object({
    fullname: joi.string().min(3).max(50).required(),
    username: joi.string().trim().alphanum().min(5).required(),
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(6).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])')).required()
})

const loginSchema = joi.object({
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(6).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])')).required()
})

module.exports = {registerSchema,loginSchema};