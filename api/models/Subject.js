const mongoose = require('mongoose');
const SubjectSchema = mongoose.Schema({
    subject_code:{type:String, unique:true, required:true},
    subject_name:{type:String, required:true},
    createdAt:{type:Date, default:Date.now()},
    pyq:[{type:mongoose.Types.ObjectId, ref:'pyq'}],
    notes:[{type:mongoose.Types.ObjectId, ref:'notes'}],
});
module.exports = mongoose.model('Subject', SubjectSchema);