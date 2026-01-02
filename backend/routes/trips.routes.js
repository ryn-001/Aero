const {auth} = require('../middlewares/auth.middlewares');
const express = require('express');
const {getUserTripByEmail} = require('../controllers/trip.controller');
const tripRouter = express.Router();

tripRouter.get('/:email',auth,getUserTripByEmail);

module.exports = tripRouter;