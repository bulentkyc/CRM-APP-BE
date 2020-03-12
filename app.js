const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();
//let currentUserId;
//DB Connection
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.text());

app.use(express.static(path.join(__dirname + '/public')));


//CORS SETUP-------------------------------------------
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //Which adresses to allow to reach our API
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); //Which headers to send with request
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
//Body parser middleware of Express
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/dashboard', require('./router/dashboard'));
app.use('/api/auth', require('./router/auth'));
/* localhost:5000/api/
localhost:5000/api/ */
const port = process.env.PORT || 5000;
//Server gets awake
app.listen(port, 
    ()=>console.log(`CRM BE App started to work on port:${port}`));



/* 
    const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is a must!']
    },
    email: {
        type: String,
        required: [true, 'email is a must!']
    },
    pass: {
        type: String,
        required: [true, 'Password is a must!']
    }
});

const loginSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'email is a must!']
    },
    pass: {
        type: String,
        required: [true, 'Password is a must!']
    }
});


module.exports = mongoose.model('users', {registerSchema,loginSchema}); */