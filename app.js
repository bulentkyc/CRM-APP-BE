const express = require('express');
const app = express();
const connectDB = require('./config/db');
const user = require('./model/user');
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
const jwtSecretKey = 'v9hxLpBE3?w2+Ww?';
//let currentUserId;

//DB Connection
connectDB();

//Body parser middleware of Express
app.use(express.json());


const port = process.env.PORT || 5000;

//Routings

app.post('/register',async (req, res) => {
    let {name, email, pass}  = req.body;
    //console.log(userName, pass);
    /* We used JS Object short hand while setting varaible names on 
    req.body and user schema */

    pass = await bcrypt.hash(pass, 10);

    const newUser = new user({
        name,
        email,
        pass
    });

    newUser.save((err)=>{
        if (err) {
            //res.status(500);
            res.json({status: 'failed', message: err});
        }else{
            res.json({status: "success", message: "Congrats! You created new account successfully"});
        }
    });

    
});

const checkAuth = (req,res,next) =>{
    //Check JWT
    const userToken = req.header('x-auth-token');

    if (!userToken) {
        return res.status(401).json({status:'failed', message: 'Authorization problem 5012'})
    }
    try {
        jwt.verify(userToken, jwtSecretKey, (fail,decodedPayload)=>{
            if (fail) {
                res.status(401).json({status:'failed', message: 'Authorization problem 5013'});
            }else {
                res.userId = decodedPayload.id;
                //currentUserId = decodedResult.id;
                next();
            }
        });
    } catch (error) {
        res.status(500).json({status:'error', message: error});
    }
}

const signToken = id => {
    return jwt.sign({id}, jwtSecretKey, {expiresIn: 3600000});
}

app.get('/inbox', checkAuth, (req, res) => {
        res.json({message:`Hello Bilal! your id is ${req.userId}`});
    });

app.post('/login', (req,res)=>{
    const {email,pass} = req.body;
    //const pass = req.body.pass
    console.log({email,pass});
    user.findOne({email}, (err, result)=>{
        if (err) {
            res.json({status: 'failed', message: err});
        } else if(!result){
            res.json({status: "failed", message: "email or password is wrong!"});
        }else {
            bcrypt.compare(pass, result.pass).then(async (isPassCorrect) => {
                //console.log(isPassCorrect);
                if (isPassCorrect) {
                    isLoggedIn = true;
                    
                    //Create Token
                    console.log(result);
                    const token = await signToken(result.id);
                    res.json({
                        status: "success",
                        message: "Congrats! You logged in successfully",
                        token
                    });

                } else{
                    res.json({status: "failed", message: "email or password is wrong!"});
                }
                
            });
        }
    });
});




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