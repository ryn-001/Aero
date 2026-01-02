const {UserTrips} = require('../models/userTrips.models');

const getUserTripByEmail = async (req,res) => {
    try{

        const {email} = req.body;
        if(!email) return res.status(400).message({message: 'Email required'});

        const userTrips = await UserTrips.findOne({email});
        if(!userTrips) return res.status(404).message({message: 'User trips not found'});

        return res.status(200).json(userTrips);
    }catch(e){
        return res.status(500).json({message: e.message});
    }
}

module.exports = {getUserTripByEmail};