const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyToken = async (req, res, next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        const accessToken = authHeader.split(" ")[1];
        await jwt.verify(accessToken, process.env.TOKEN_SECRET, (err, user)=>{
            if(err) return res.status(403).json({authenticationError:"You are unauthorized"});
            else req.user = user;
            next();
        })
    }
    else return res.status(401).json({authenticationError:"You are not authenticated"});
};
const validateIsAdmin = async (req, res, next)=>{
    if(!req.user) res.status(404).json(errorModal("authentication", "email", "User not found"));
    const email = req.user.email;
    try {
        const user = await User.findOne({email:email});
        if(!user) return res.status(404).json(errorModal("authentication", "email", "User not found"));
        if(!user.isAdmin) return res.status(400).json(errorModal("unauthorised", "Access resitricted", "User is not authorised"));
        next();
    } catch (error) {
       return res.status(500).send(errorModal("server", "server", "Server error try again!"));
    }
}
const errorModal = (errorType, errorFor, errorMessage) => {
    return {
        errorInfo: {
            isError:true,
            errorType,
            errorFor,
            errorMessage
        }
    };
};
const validateEmail = (email)=>{
    return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
}
const validateName = (name)=>{
    if(!name.first_name || name.first_name.trim(" ").length === 0)
        return false;
    if(!name.last_name || name.last_name.trim(" ").length === 0)
        return false;
    return true;
}
const validateForm = async (req, res, next) => {
    if (!req.body.email || !validateEmail(req.body.email)) {
        return res.status(401).json(errorModal("Invalid Input", "email", "Invalid email"));
    }
    if(!req.body.registration_no || (isNaN(req.body.registration_no) !== false))
        return res.status(401).json(errorModal("Invalid Input", "registration_no", "Must be numeric"));
    if(!req.body.name || !validateName(req.body.name))
        return res.status(401).json(errorModal("Invalid Input", "name", "Invalid Name"));

    return next();
};
module.exports = {validateForm, errorModal, validateEmail, verifyToken, validateIsAdmin, validateName};