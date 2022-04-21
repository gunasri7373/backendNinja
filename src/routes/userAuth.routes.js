
const router = require('express').Router();

const userAuthController = require('../controllers/userAuth.controller');

router.post('/sign-up', userAuthController.userSignUp);

router.post('/log-in', userAuthController.userLogin);

module.exports = router;
