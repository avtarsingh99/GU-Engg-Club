const mongoose = require('mongoose');
const pyqSchema = mongoose.Schema({
    subject_code: {type:String, required:true},
    posts:[{type:mongoose.Types.ObjectId, ref:'Posts', required:true}],
    createdAt:{type:Date, default:Date.now()},
});

module.exports = mongoose.model('Pyq', pyqSchema);