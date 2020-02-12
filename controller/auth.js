
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

    if(userCheck){
        res.json({status: 'failed', message: 'Already in use!'});
        return;
    }
    console.log('hey');
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


exports.postLogin = (req,res)=>{
    const {email,pass} = req.body;
    //const pass = req.body.pass
    //console.log({email,pass});
    user.findOne({email}, (err, result)=>{
        if (err) {
            res.json({status: 'failed', message: err});
        } else if(!result){
            res.json({status: "failed", message: "email or password is wrong!"});
        }else {
            bcrypt.compare(pass, result.pass).then(async (isPassCorrect) => {
                //console.log(isPassCorrect);
                if (isPassCorrect) {
                    
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
}