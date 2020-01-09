const express = require('express');
const app = express();
const connectDB = require('./config/db');
const user = require('./model/user');

//DB Connection
connectDB();

//Body parser middleware of Express
app.use(express.json());


const port = process.env.PORT || 5000;

//Routings
app.get('/', (req, res) => res.json({message:'Hello Bilal'}));

app.post('/register',(req, res) => {
    const {name, email, pass}  = req.body;
    //console.log(userName, pass);
    /* We used JS Object short hand while setting varaible names on 
    req.body and user schema */
    const newUser = new user({
        name,
        email,
        pass
    });

    newUser.save();

    res.json({status: "success"});
});

//Server gets awake
app.listen(port, 
    ()=>console.log(`CRM BE App started to work on port:${port}`));