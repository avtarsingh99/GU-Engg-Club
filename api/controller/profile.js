const User = require('../models/User');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const {errorModal} = require('../middleware/verificationsAndValidations');
const updateProfile = async (req, res)=>{
    const { password, name, new_registration_no, email, new_email} = req.body;
    const avatar = req.body.file_url;
    const avatar_id = req.body.file_id;

    // if email or registration update is available find if already exist
    try {
        const user = await User.findOne({'$or': [{email: new_email}, {registration_no:new_registration_no}]});
        if(user) return res.status(401).json(errorModal("Updation", "Email or registration number are not available", "Email or registration number are already registered"));
    } catch (error) {
        console.log(error);
    }
    
    // add valid fields
    let fieldToUpdate = {};
    if (password) {
        if (password.trim().length < 8)
            return res.status(400).json(errorModal("invalid", "password", "Password must be at least 8 character long"));
        fieldToUpdate.password = await CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET).toString();
    };
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

    // update the object
    try {
        const _user = await User.findOneAndUpdate({ email: email }, {
            $set: fieldToUpdate
        }, { new: true });
        const accessToken = await jwt.sign(
            {
                registration_no: _user.registration_no,
                name:_user.name,
                avatar:_user.avatar,
                email:_user.email,
                id:_user._id,
            },
            process.env.TOKEN_SECRET,
            { expiresIn: "1w" }
        );

        // destructure user._doc and add accessToken
        const loginDetails = {
            registration_no:_user._doc.registration_no,
            name:_user._doc.name,
            email:_user._doc.email,
            avatar:_user._doc.avatar,
            isAdmin:_user._doc.isAdmin,
            accessToken
        };
        return res.status(200).json(loginDetails);
    } catch (error) {
        console.log(error);
        return res.status(500).json(errorModal("server", "server", "server error"));
    }
};
module.exports = {updateProfile};