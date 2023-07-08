const cloudinary = require('cloudinary').v2 ;
const {errorModal} = require('../middleware/verificationsAndValidations');
const uploadfile = async (req, res, next)=>{
    let file;
    if(req.files)
        file = req.files.file?req.files.file:req.files.avatar;
    if(!file)
        next();
    else{
        try{
            const res = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'gu_project'
            });
            req.body.file_url = res.secure_url;
            req.body.file_id = res.public_id;
            next();
        }catch(error){
            return res.status(500).json(error);
        }
    }
};
module.exports = {uploadfile};