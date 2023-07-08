const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    author:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
    },
    title:{type:String, required:true},
    content:{type:String, required:true},
    type:{type:String, default:'normal'},
    file_url:{type:String},
    file_id:{type:String},
    createdAt:{type:Date, default:Date.now()}
});
module.exports = mongoose.model('Posts', postSchema);