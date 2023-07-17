const User = require('../models/User');
const Token = require('../models/Token');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const crypto = require('crypto');
const {errorModal, validateEmail} = require('../middleware/verificationsAndValidations');
const deleteFile  = require('../utils/deletefile');

// POST /profile/updateprofile
// consist of verifyToken, filter, uploadFile, updateprofile
/*
    There can be two case
    Case 1: User who is accessing the updateprofile endpoint is the non-admin user
        => Non admin can only update avatar and password from the profile section
        so the filter middleware check whether the user illegly trying to change the email,name,registration_no
            if yes it will return error
            else pass to uploadFile
    Case 2: if the user is admin
        validate the fields 
        pass to uploadFile

*/
const updateProfile = async (req, res)=>{
    const { password, name, new_registration_no, email, new_email} = req.body;
    const avatar = req.body.file_url;
    const avatar_id = req.body.file_id;

    // if the another user having same email and registration which the user is trying to update through the error
    const fieldsToCheck = [];
    if(new_email) fieldsToCheck.push({email:new_email});
    if(new_registration_no) fieldsToCheck.push({registration_no:new_registration_no});
    
    // add valid fields
    let fieldToUpdate = {};
    if (password) 
        fieldToUpdate.password = await CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET).toString();
    if (name) 
        fieldToUpdate.name = name;
    if (avatar) {
        fieldToUpdate.avatar_id = avatar_id;
        fieldToUpdate.avatar = avatar
    };
    if(new_email) fieldToUpdate.email = new_email;
    if(new_registration_no) fieldToUpdate.registration_no = new_registration_no;

    //? If nothing is passed by user in fields 
    if (Object.keys(fieldToUpdate).length === 0) return res.status(400).json(errorModal("Invalid", "Field is empty", "Nothing to update, fields are empty"));
    else{
        // update the object
        try {
            // if email or registration update is available find if already exist
            if(fieldsToCheck.length > 0){
                const user = await User.findOne({'$or': fieldsToCheck});
                if(user) return res.status(401).json(errorModal("Updation", "Email or registration number are not available", "Email or registration number are already registered"));
            }
            else{

                // update the user and return previous info of user so, we can delete the previous avatar
                const _user = await User.findOneAndUpdate({ email: email }, {
                    $set: fieldToUpdate
                });

                // if new avatar exist delete previous one by taking avatar id from _user
                if(fieldsToCheck.avatar)
                    deleteFile(_user._doc.avatar_id);
                return res.status(200).json("Success");
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json(errorModal("server", "server", "server error"));
        }
    }

};
const getProfile = async (req, res)=>{
    const email = req.body.email?req.body.email:null;
    const registration_no = req.body.registration_no?req.body.registration_no:null;
    let searchQuery = {};
    if(email) searchQuery.email = email;
    else if(registration_no) searchQuery.registration_no = registration_no;

    if(!email && !registration_no)
        res.status(401).json(errorModal("Invalid field", "No search parameter", "Please provide at least one search parameter"));
    else{
        try {
            const _user = await User.findOne({...searchQuery});
            const userDetails = {
                registration_no:_user._doc.registration_no,
                name:_user._doc.name,
                email:_user._doc.email,
                avatar:_user._doc.avatar,
                isAdmin:_user._doc.isAdmin,
            };
            return res.status(200).json(userDetails);
        } catch (error) {
            console.log(error);
            return res.status(500).json(errorModal("server", "server", "server error"));
        }
    }
};
const getAdmins = async (req, res)=>{
    try {
        const admins = await User.find({isAdmin:true}).select('name email avatar registration_no');
        return res.status(200).json(admins);
    } catch (error) {
        console.log(error);
        return res.status(500).json(errorModal("server", "server", "server error"));
    }
};
const resestPasswordToken = async (req, res, next)=>{
    const {email} = req.body;
    if (!validateEmail(email)) return res.status(401).json(errorModal("Validation", "Email", "Not a valid email address"));
    try {
        const user = await User.findOne({email:email});
        if (!user) return res.status(401).json(errorModal("authentication", "username_email", "User not found"));
        const resetToken = await crypto.randomBytes(32).toString('hex');
        const token = new Token(
            {
                token: resetToken,
                email: req.body.email,
            }
        );
        await token.save();
        req.email = email;
        req.name = user.fullname;
        req.redirectLink = 'https://meowchat.netlify.app/resetpassword/verify/' + resetToken;
        req.type = 'Reset Password';
        next();
        
    } catch (err) {
        console.log(err);
        return res.status(500).send(errorModal("server", "server", "Server error try again!"));
    }
};
const UpdatePassword = async (req, res)=>{
    const { token, password } = req.body;
    if (password.length < 8) return res.status(500).send(errorModal("password", "password", "At least 8 character long."));
    try {
        const userInfo = await Token.findOneAndDelete({ token: token });
        if (!userInfo) return res.status(500).send(errorModal("Token", "Token", "Token expired"));
        const email = userInfo._doc.email;
        await User.findOneAndUpdate({ email }, { password: await CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET).toString() });
        return res.status(201).send(errorModal("Update", "Password", "Password is updated"));
    } catch (error) {
        return res.status(500).send(errorModal("server", "server", "Server error try again!"));
    }
}

module.exports = {updateProfile, getProfile, getAdmins, UpdatePassword, resestPasswordToken};