const router = require('express').Router();
const auth = require('../controller/auth');

//localhost:5000/api/auth/
//router.post('/')

router.post('/register', auth.postRegister);

router.post('/login', (req,res)=>{
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

module.exports = router;