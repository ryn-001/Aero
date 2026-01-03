const {auth} = require('../middlewares/auth.middlewares');
const express = require('express');
const {getUserTripByEmail, addTrip, generateTrip} = require('../controllers/trip.controller');
const tripRouter = express.Router();

tripRouter.post('/createTrip',auth,addTrip);
tripRouter.get('/generateTrip',auth,generateTrip);
tripRouter.get('/:email',auth,getUserTripByEmail);

module.exports = tripRouter;