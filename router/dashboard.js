const router = require('express').Router();
const dashboard = require('../controller/dashboard');
const auth = require('../middleware/auth');

/* router.route('/dashboard')
.get( checkAuth, (req, res) => {
    console.log('hello Bora');
        res.json({message:`Hello Bilal! your id is ${req.userId}`});
}); */

//localhost:5000/api/dashboard/
router.get('/', auth.checkAuth ,dashboard.getHome);

/* router.get('/edit', (req, res) => {
    console.log('hello Bora');
        res.json({message:`Hello Bilal! your id is ${req.userId}`});
}); */


module.exports = router;