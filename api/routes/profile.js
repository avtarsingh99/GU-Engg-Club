const router = require('express').Router();
const {verifyToken} = require('../middleware/verificationsAndValidations');
const {updateProfile} = require('../controller/profile');
const {filter} = require('../middleware/filter');
const {uploadfile} = require('../utils/fileupload');
router.post('/updateprofile',verifyToken,filter,uploadfile, updateProfile);
module.exports = router;