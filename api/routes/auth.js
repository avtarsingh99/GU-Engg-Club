const router = require('express').Router();
const {login, registerUser} = require('../controller/authController');
const {verifyToken,validateIsAdmin, validateForm} = require("../middleware/verificationsAndValidations");
const sendMail = require('../email/mailSender');
router.post('/login', login);
router.post('/register',verifyToken, validateIsAdmin,validateForm, registerUser,sendMail);
router.patch('/deleteuser', verifyToken, validateIsAdmin);
// router.post('/register', validateForm, registerUser,sendMail);
module.exports = router;