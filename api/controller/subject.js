const Subject = require('../models/Subject');
const {errorModal} = require("../middleware/verificationsAndValidations");
const addSubject = async (req, res)=>{
    const subject_code = req.body.subject_code;
    if(!subject_code) return res.status(500).json(errorModal("Incomplete Info", "Subject", "Subject Code Missing"));
    const subject = new Subject({
        subject_code,
    });
    try {
        const newSubject = await subject.save();
        return res.status(200).json(newSubject);
    } catch (error) {
        res.status(500).send(errorModal("server", "server", "Server error try again!"));
    }
};
module.exports = {addSubject};
