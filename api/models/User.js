const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');
const defaultAvatarImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png';
const UserSchema = new mongoose.Schema({
    registration_no: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: {
        first_name: { type: String, required: true },
        middle_name: { type: String },
        last_name: { type: String, required: true }
    },
    avatar: { type: String, default: defaultAvatarImage },
    isAdmin: { type: Boolean, default: false },
    password: { type: String, required: true },
    posts: [{ type: mongoose.Types.ObjectId, ref: "post", required: true }],
    pyq: [{ type: mongoose.Types.ObjectId, ref: "pyq", required: true }],
    notes: [{ type: mongoose.Types.ObjectId, ref: "notes", required: true }],
    projects: [{ type: mongoose.Types.ObjectId, ref: "projects", required: true }]
}, {timestamps:true});
UserSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await CryptoJS.AES.encrypt(this.password, process.env.CRYPTO_SECRET).toString();
});
UserSchema.methods.validatePassword = async function(userSendPassword){
    const decryptPassword = await CryptoJS.AES.decrypt(this.password, process.env.CRYPTO_SECRET).toString(CryptoJS.enc.Utf8);
    return userSendPassword === decryptPassword;
};
module.exports = mongoose.model('User', UserSchema);