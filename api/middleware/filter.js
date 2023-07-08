const User = require('../models/User');
const {errorModal, validateEmail, validateName} = require('../middleware/verificationsAndValidations');
const filter = async (req, res, next)=>{
    const _user_email = req.user.email;
    const {new_email, name, new_registration_no} = req.body;
    try {
        const _user = await User.findOne({email:_user_email});
        if(_user.isAdmin){
            if(name && !validateName(name)) return res.status(401).json(errorModal("Invalid Input", "name", "Invalid Name"));
            else if(new_email && !validateEmail(new_email)) return res.status(401).json(errorModal("Invalid Input", "email", "Invalid email"));
            else if(new_registration_no && (isNaN(new_registration_no) !== false)) return res.status(401).json(errorModal("Invalid Input", "registration_no", "Must be numeric"));
            else next();
        }
        else if(email !== undefined || name !== undefined || registration_no !== undefined) {
            let deniedFields = [];
            if(email) deniedFields.push('Email');
            if(name) deniedFields.push('Name');
            if(registration_no) deniedFields.push('Registration Number');
            return res.status(400).json(errorModal("Access Denied", 'Some fields require admin access', `${deniedFields}`));
        }
        else 
            next();

    } catch (error) {
        console.log(error);
        return res.status(500).json(errorModal("Server", "Sever error", "Try again"));
    }
} 
module.exports = {filter};