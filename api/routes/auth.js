const router = require('express').Router();
const {login, registerUser} = require('../controller/authController');
const {verifyToken,validateIsAdmin, validateForm} = require("../middleware/verificationsAndValidations");
const sendMail = require('../email/mailSender');
router.post('/verifytoken', verifyToken, (req, res)=>res.status(200).json(req.user));
router.post('/login', login);
router.post('/register',verifyToken, validateIsAdmin,validateForm, registerUser,sendMail);
module.exports = router;