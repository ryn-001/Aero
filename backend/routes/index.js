const express = require('express');
const router = express.Router();

const userRouter = require('../routes/uers.routes');

router.use('/users',userRouter);

module.exports = router;