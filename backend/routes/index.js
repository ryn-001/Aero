const express = require('express');
const router = express.Router();
const tripRouter = require('./trips.routes');
const userRouter = require('./users.routes');

router.use('/users',userRouter);
router.use('/trip',tripRouter);

module.exports = router;