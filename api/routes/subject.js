const router = require('express').Router();
const {verifyToken,validateIsAdmin} = require("../middleware/verificationsAndValidations");
const {addSubject, deleteSubject} = require('../controller/subject');
router.post('/add', verifyToken, validateIsAdmin, addSubject);
module.exports = router;