const express = require('express');
const userRouter = express.Router();
const validate = require('../middlewares/validate.middleware');
const {registerSchema,loginSchema} = require('../validations/users.validations');
const {registerUser,loginUser,logoutUser} = require('../controllers/authentication.controllers');
const {getMe} = require('../controllers/user.controller');
const {auth,isAuthenticated} = require('../middlewares/auth.middlewares');

userRouter.post('/register',validate(registerSchema),registerUser);
userRouter.post('/login',validate(loginSchema),loginUser);
userRouter.get('/me',auth,getMe);
userRouter.get('/logout',isAuthenticated,logoutUser);

module.exports = userRouter;