const router = require('express').Router();
const {verifyToken} = require('../middleware/verificationsAndValidations');
const {updateProfile, getProfile, getAdmins} = require('../controller/profile');
const {filter} = require('../middleware/filter');
const {uploadfile} = require('../utils/fileupload');
router.post('/updateprofile',verifyToken,filter,uploadfile, updateProfile);
router.get('/user',verifyToken, getProfile);
router.get('/adminlist', getAdmins);
module.exports = router;