const mongoose = require('mongoose');
const express = require('express');
const app = express();

const startServer = async (app,MONGODB_URI,PORT) => {
    
    try{
        await mongoose.connect(MONGODB_URI).then(async () => {
            app.listen(PORT, () => console.log(`App running on PORT: ${PORT}`));
            console.log('Database connected successfully !')
        })
    }catch(e){
        console.log('An error occured ' + e);
    }

}

module.exports = startServer;