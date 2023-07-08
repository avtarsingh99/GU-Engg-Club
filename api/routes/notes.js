const router = require('express').Router();
const {createNotesPost, getNotes} = require("../controller/notes");
const {verifyToken} = require('../middleware/verificationsAndValidations');
const {postWithFileAndSubjectCode} = require('../middleware/postValidator');
const {uploadfile} = require("../utils/fileupload");
router.post('/upload',verifyToken,postWithFileAndSubjectCode,uploadfile, createNotesPost);
router.get('/notes', getNotes);

module.exports = router;