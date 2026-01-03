const mongoose = require('mongoose');

const userTripsSchema = mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    trips:{
        type: Array,
        default: [],
        required: true,
    }
},{timestamps: true});

const UserTrips = mongoose.model('UserTrips',userTripsSchema);
module.exports = {UserTrips};