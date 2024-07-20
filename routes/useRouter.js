
const userCtrl = require('../controller/UserCtrl');
const auth = require('../middleware/auth');

const router = require('express').Router()


router.post('/register',userCtrl.register);
router.post('/login',userCtrl.login);
router.get('/logout',userCtrl.logout);

router.post('/refreshtoken',userCtrl.refreshtoken);
router.get('/infor',auth,userCtrl.getUser)


module.exports= router;