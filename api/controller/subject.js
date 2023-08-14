const Subject = require('../models/Subject');
const {errorModal} = require("../middleware/verificationsAndValidations");
const addSubject = async (req, res)=>{
    const subject_code = req.body.subject_code;
    const subject_name = req.body.subject_name;
    if(!subject_code) return res.status(500).json(errorModal("Incomplete Info", "Subject", "Subject Code Missing"));
    const subject = new Subject({
        subject_code,
        subject_name
    });
    try {
        const newSubject = await subject.save();
        return res.status(200).json(newSubject);
    } catch (error) {
        if (error.name === "ValidationError") {
            let errors = {};

            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });

            return res.status(400).send(errors);
        }
        res.status(500).send(errorModal("server", "server", "Server error try again!"));
    }
};
const getAllSubject = async (req, res)=>{
    try {
        const subjects = await Subject.find();
        return res.status(200).json(subjects);
    } catch (error) {
        res.status(500).send(errorModal("server", "server", "Server error try again!"));
    }
}
module.exports = {addSubject, getAllSubject};
