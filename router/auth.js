const router = require('express').Router();
const auth = require('../controller/auth');

//localhost:5000/api/auth/
//router.post('/')

router.post('/register', auth.postRegister);

router.post('/login', auth.postLogin);

module.exports = router;