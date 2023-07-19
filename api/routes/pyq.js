const router = require('express').Router();
const {verifyToken} = require('../middleware/verificationsAndValidations');
const {postWithFileAndSubjectCode} = require('../middleware/postValidator');
const {uploadfile} = require("../utils/fileupload");
const {createPyqPost, getPyq}  = require('../controller/pyq');
router.post('/upload',verifyToken,postWithFileAndSubjectCode,uploadfile, createPyqPost);
router.get('/pyq', getPyq);

module.exports = router;