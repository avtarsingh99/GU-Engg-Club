const {validateEmail, errorModal} = require("../middleware/verificationsAndValidations");
const User = require('../models/User');
const jwt = require('jsonwebtoken');// check if the user is present or not (should not be present by both email and registration_no)

const findUser = async (credentails)=>{
    try {
        const user = await User.findOne({
            $or:[{'email':credentails.email}, {'registration_no':credentails.registration_no}]
        });
        if(!user) return undefined;
        return user;
    } catch (error) {
    }
    return undefined;
}
// generate 8 size random password while register a user
function generatePassword() {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'+'abcdefghijklmnopqrstuvwxyz0123456789@#$';
    for (let i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random()* str.length + 1);
        pass += str.charAt(char)
    }
    return pass;
}




//******************************* end points start ********************************** */
// POST:/api/auth/login  (no middleware in this endpoint)
/*
    return user detail after successfull login and a accessToken
    accessToken: only valid for 1 week
*/
const login = async(req, res)=>{
    const {email, password} = req.body;

    // if no email or password provided in the body
    if (!email || !password)
        return res.status(401).json(errorModal("authentication", "incomplete_info", "Please Provide all details"));

    // if invalid email is provided return errorModal
    if(!validateEmail(email)) 
        return res.status(401).json(errorModal("authentication", "email", "Not a valid mail format"));

    // try catch  block to handle error while resolving promises
    try {
        // search user using mail
        const user = await findUser({email});

        // if user in not in database return authentication error
        if(!user) return res.status(404).json(errorModal("authentication", "email", "User not found"));

        // return validatePassword method of user model to check the encrypted password and received password (return true false)
        const isAutenticated = await user.validatePassword(password);
        if(!isAutenticated) return res.status(401).json(errorModal("authentication", "password", "Incorrect password"));

        // create access token
        const accessToken = await jwt.sign(
            {
                registration_no: user.registration_no,
                name:user.name,
                avatar:user.avatar,
                email:user.email,
                id:user._id,
            },
            process.env.TOKEN_SECRET,
            { expiresIn: "1w" }
        );

        // destructure user._doc and add accessToken
        const loginDetails = {
            registration_no:user._doc.registration_no,
            name:user._doc.name,
            email:user._doc.email,
            avatar:user._doc.avatar,
            isAdmin:user._doc.isAdmin,
            accessToken
        };
        return res.status(200).json(loginDetails);
    } catch (error) {
        console.log(error);
        res.status(500).send(errorModal("server", "server", "Server error try again!"));
    }
};

// POST:/api/auth/register  {*****ADMIN ACCESS IS REQUIRED*******}
/* 
    middelware to pass: {preMiddleware}--> verifyToken, validateIsAdmin,validateForm
    {postMiddleware}--> sendMail

    step1: verify accessToken
            if valid: go to step 2
            else: return errorModal
    step2: check the user accessing the router isValid (isAdmin)
            if yes: go to step3
            else: return errorModal
    step3: validate form check is all the required details are correct {name,email,registration_no}
            if yes: go to step4
            else: return errorModal
    step4: Create user generate random password
            if success: go to step5
            else: return errorModal
    step5: Send mail to the user {credentials email and password}
            if success: registered user will receive mail
            else: return errorModal to admin
*/
const registerUser = async(req, res, next)=>{
    const {name, email, registration_no} = req.body;

    // generate 8 char random password
    const password = generatePassword();
    
    // check if user exist or not (by email, registration_no)
    const user = await findUser({email, registration_no});
    if(user) 
        return res.status(404).json(errorModal("authentication", "user", "User already exists"));
    const newUser = new User({
        name,
        email,
        registration_no,
        password
    });
    try {
        await newUser.save();
        req.user = newUser;
        req.user.password = password;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send(errorModal("server", "server", "Server error try again!"));
    }

};
module.exports = {login,registerUser};