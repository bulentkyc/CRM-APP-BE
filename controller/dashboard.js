exports.getHome = (req, res) => {
    console.log('hello Bora');
        res.json({status:'success', message:`Hello Bilal! your id is ${req.userId}`});
}

exports.newPerson = (req,res) => {
    console.log('req',req.body);
    res.json({status:'success',message:'Your request has been received'});
}