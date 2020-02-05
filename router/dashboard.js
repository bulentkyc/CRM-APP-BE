const router = require('express').Router();

/* router.route('/dashboard')
.get( checkAuth, (req, res) => {
    console.log('hello Bora');
        res.json({message:`Hello Bilal! your id is ${req.userId}`});
}); */

//localhost:5000/api/dashboard/
router.get('/', (req, res) => {
    console.log('hello Bora');
        res.json({message:`Hello Bilal! your id is ${req.userId}`});
});

/* router.get('/edit', (req, res) => {
    console.log('hello Bora');
        res.json({message:`Hello Bilal! your id is ${req.userId}`});
}); */


module.exports = router;