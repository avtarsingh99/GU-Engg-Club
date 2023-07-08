const cloudinary = require('cloudinary').v2 ;
const deleteFile = async (file_id) => {
    if(!file_id) return;
    try {
        await cloudinary.uploader.destroy(file_id);
    } catch (error) {
        console.log(error);
    }
}
module.exports = deleteFile;