const {errorModal} = require('./verificationsAndValidations');
const Subject = require('../models/Subject');
const basicValidate = (title,content)=>{
    if(!title || title.trim(" ").length === 0)
        return errorModal("Incomplete Information", "Title", "Title is empty");
    if(!content || content.trim(" ").length === 0)
        return errorModal("Incomplete Information", "Content", "Content is Empty");
    return {
        errorInfo:{
            isError:false
        }
    }
};
const validatePost = (req, res, next)=>{
    const {title, content, type} = req.body;
    const result = basicValidate(title, content);
    if(result.errorInfo.isError === true) return res.status(400).json(result);
    if(!type) req.body.type = 'normal';
    next();
};
const postWithFileAndSubjectCode = async (req, res, next)=>{
    const {title, content, type, subject_code} = req.body;
    const file = req.files;
    try {
        const result = basicValidate(title, content);
        if(result.errorInfo.isError === true) return res.status(400).json(result);
        if(!file) return res.status(400).json(errorModal('Incomplete', 'File not found', 'Please add a file to continue'));
        if(!type) req.body.type = 'notes';
        const  _subject = await Subject.findOne({subject_code:subject_code});
        if(!_subject) return res.status(400).json(errorModal('Invalid', 'Subject not found', `${subject_code} is not valid`));
        next();
    } catch (error) {
        return res.status(500).json(errorModal('Server Error', 'Server Error', 'Server error try again'))
    }

}
module.exports = {validatePost, postWithFileAndSubjectCode};