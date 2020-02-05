const express = require('express');
const app = express();
const connectDB = require('./config/db');
const user = require('./model/user');
const bcrypt = require('bcrypt');
require('dotenv').config();

//let currentUserId;

//DB Connection
connectDB();

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