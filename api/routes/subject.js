const router = require('express').Router();
const {verifyToken,validateIsAdmin} = require("../middleware/verificationsAndValidations");
const {addSubject, getAllSubject} = require('../controller/subject');
router.post('/add', verifyToken, validateIsAdmin, addSubject);
router.get('/allsubjects', getAllSubject);
module.exports = router;