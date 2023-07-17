const router = require('express').Router();
const {verifyToken} = require('../middleware/verificationsAndValidations');
const {updateProfile, getProfile, getAdmins, resestPasswordToken, UpdatePassword} = require('../controller/profile');
const {filter} = require('../middleware/filter');
const {uploadfile} = require('../utils/fileupload');
router.post('/updateprofile',verifyToken,filter,uploadfile, updateProfile);
router.get('/user',verifyToken, getProfile);
router.get('/adminlist', getAdmins);
router.post('/resetpasswordtoken', resestPasswordToken, (req, res)=>{
    console.log(req.redirectLink);
    return res.status(200).json("success");
});
router.put('/resetpassword', UpdatePassword);
module.exports = router;