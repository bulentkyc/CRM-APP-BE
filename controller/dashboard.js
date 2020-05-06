const multer = require('multer');
const path = require('path');
const Contacts = require('../model/contact');

let fileName;

const storage = multer.diskStorage({
    destination: 'public/avatars/',
    filename: function (req, file, cb) {
        fileName = 'a' + Date.now() + path.extname(file.originalname);
        cb(null, fileName)
    }
    })

const upload = multer({ 
    storage
}).single('file');



exports.getHome = (req, res) => {
    console.log('hello Bora');
        res.json({status:'success', message:`Hello Bilal! your id is ${req.userId}`});
}

exports.newPerson = (req,res) => {
    //console.log('req',JSON.stringify(req.body));
    upload(req,res, (err) => {
        if (err instanceof multer.MulterError) {
            console.log('req',req.body);
            // A Multer error occurred when uploading.
            console.log(err);
        } else if (err) {
            // An unknown error occurred when uploading.
            console.log(err);
        }
        //console.log('req',req.body);
        const {name, email, phone, notes} = req.body;
        new Contacts({
            referanceId:req.userId,
            avatar:fileName,
            name,
            email,
            phone,
            notes
        }).save().then((result,err) => {
            if (err) {
                res.json({status:'failed', message: err});
            }else {
                //We send whole contact list not just final person due to keep process simple.
                Contacts.find({referanceId:req.userId}).then((data, err)=>{
                    if (err) {
                        res.json({status:'failed', message: err});
                    }else {
                        res.json({status:'success', message: data}); 
                    }
                });
            }
        });
    });
}
