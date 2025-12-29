const express = require('express');
const userRouter = express.Router();
const validate = require('../middlewares/validate.middleware');
const {registerSchema,loginSchema} = require('../validations/users.validations');
const {registerUser,loginUser} = require('../controllers/users.controllers');

userRouter.post('/register',validate(registerSchema),registerUser);
userRouter.post('/login',validate(loginSchema),loginUser);

module.exports = userRouter;