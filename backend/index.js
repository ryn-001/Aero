const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const startServer = require('./config/startServer')
const routes = require('./routes/index');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Initiating App
const app = express();
dotenv.config();
app.use(cors({
  origin: ['https://aero-umber.vercel.app', 'http://10.38.200.211:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3001;

//Routes
app.use('/v1/api',routes);

// Starting server
startServer(app, MONGODB_URI, PORT);