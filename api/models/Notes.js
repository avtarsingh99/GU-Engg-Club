const mongoose = require('mongoose');
const NotesSchema = mongoose.Schema({
    subject_code: {type:String, required:true},
    posts:[{type:mongoose.Types.ObjectId, ref:'Posts', required:true}],
    createdAt:{type:Date, default:Date.now()},
});

module.exports = mongoose.model('Notes', NotesSchema);