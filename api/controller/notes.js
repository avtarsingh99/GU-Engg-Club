const Notes = require('../models/Notes');
const User = require('../models/User');
const Post = require('../models/Post');
const Subject = require('../models/Subject');
const {errorModal} = require('../middleware/verificationsAndValidations');

const mongoose = require('mongoose');
const createNotesPost = async (req, res)=>{
    const author = req.user.id;
    const {title, content, type, subject_code, file_url, file_id} = req.body;
    const newPost = new Post({
        author,
        title,
        content,
        file_url,
        file_id,
        type
    });
    try {
        const mongooseSession = await mongoose.startSession();
        mongooseSession.startTransaction();
        const _post = await newPost.save({mongooseSession});
        const _user = await User.findById({_id:author});
        const _subject = await Subject.findOne({subject_code:subject_code});
        const _notes = await Notes.findOne({subject_code:subject_code});
        if(!_notes){
            const new_notes = new Notes({subject_code:subject_code, posts:[_post]});
            await  new_notes.save();
        }
        else{
            _notes.posts.push(_post);
            await _notes.save({mongooseSession});
        }
        _user.posts.push(_post);
        _user.notes.push(_post);
        _subject.notes.push(_post);
        await _user.save({mongooseSession});
        await _subject.save({mongooseSession});
        await mongooseSession.commitTransaction();
        return res.status(200).json(_post);
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorModal("server", "server", "Server error try again!"));
    }
};
const getNotes = async (req, res)=>{
    const {subject_code} = req.body;
    const limit = req.query.limit?req.query.limit:10;
    const page = req.query.page?req.query.page-1:0;
    try {
        // chain populate method
        const _notes = await Notes.find({subject_code:subject_code}).sort('-createdAt').skip(page*10).limit(limit).populate({path:'posts', populate:{path:'author', select:'name avatar registration_no isAdmin'}});
        return res.status(200).json(_notes);
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorModal("server", "server", "Server error try again!"));
    }
}

module.exports = {createNotesPost, getNotes};