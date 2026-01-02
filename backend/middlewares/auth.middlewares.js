const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({message: 'Authentication required'});
        }

        const token = authHeader.split(" ")[1];
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);

        req.user = decode;
        next();
    }catch(e){
        return res.status(500).json({message: e.message});
    }
}

const isAuthenticated = async (req,res,next) => {
    try{
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ message: 'User must login' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = await User.findById(decoded._id);

        if (!req.user) {
            return res.status(404).json({ message: 'User not found' });
        }

        next();
    }catch(e){
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

module.exports = {auth,isAuthenticated};