const multer = require('multer');
const path = require('path');

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
}).single();



exports.getHome = (req, res) => {
    console.log('hello Bora');
        res.json({status:'success', message:`Hello Bilal! your id is ${req.userId}`});
}

exports.newPerson = (req,res) => {
    console.log('req',JSON.stringify(req.body));
    upload(req,res, (err) => {if (err instanceof multer.MulterError) {
        console.log('req',req.body);
        // A Multer error occurred when uploading.
        console.log(err);
      } else if (err) {
        // An unknown error occurred when uploading.
        console.log(err);
      }
      
    });

    res.json({status:'success',message:'Your request has been received'});
}