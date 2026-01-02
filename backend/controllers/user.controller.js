const {User} = require('../models/users.models');

const getMe = async (req,res) => {
    try{
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            username: user.username
        });
    }catch(e){
        return res.status(500).json({message: e.message});
    }
}

module.exports = {getMe}