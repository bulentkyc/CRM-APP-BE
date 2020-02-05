
const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const user = require('../model/user');
const bcrypt = require('bcrypt');

const signToken = id => {
    return jwt.sign({id}, jwtSecretKey, {expiresIn: 3600000});
}

exports.postRegister =  async (req,res) => {
    let {name, email, pass}  = req.body;
    //console.log(userName, pass);
    /* We used JS Object short hand while setting varaible names on 
    req.body and user schema */

    //let userCheck = new user;
    let userCheck = await user.findOne({email});

    if(userCheck) res.json({status: 'failed', message: 'Already in use!'});

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

    
}
