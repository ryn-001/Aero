const {auth} = require('../middlewares/auth.middlewares');
const express = require('express');
const {addTrip, generateTrip, getUserTrips} = require('../controllers/trip.controller');
const tripRouter = express.Router();

tripRouter.post('/createTrip',auth,addTrip);
tripRouter.get('/generateTrip',auth,generateTrip);
tripRouter.get('/all',auth,getUserTrips);

module.exports = tripRouter;