const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');
const Subject = require('../models/Subject');
const { errorModal } = require('../middleware/verificationsAndValidations');
const PYQ = require('../models/PYQ');
const createPyqPost = async (req, res) => {
    const author = req.user.id;
    const { title, content, type, subject_code, file_url, file_id } = req.body;
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
        const _post = await newPost.save({ mongooseSession });
        const _user = await User.findById({ _id: author });
        const _subject = await Subject.findOne({ subject_code: subject_code });
        const _pyq = await PYQ.findOne({ subject_code: subject_code });
        if (!_pyq) {
            const new_pyq = new PYQ({ subject_code: subject_code, posts: [_pyq] });
            await new_pyq.save();
        }
        else {
            _pyq.posts.push(_post);
            await _pyq.save({ mongooseSession });
        }
        _user.posts.push(_post);
        _user.pyq.push(_post);
        _subject.pyq.push(_post);
        await _user.save({ mongooseSession });
        await _subject.save({ mongooseSession });
        await mongooseSession.commitTransaction();
        return res.status(200).json(_post);
    } catch (error) {
        
        return res.status(500).send(errorModal("server", "server", "Server error try again!"));
    }
};
const getPyq = async (req, res) => {
    const { subject_code } = req.body;
    const limit = req.query.limit ? Math.abs(req.query).limit : 10;
    const page = req.query.page ? Math.abs(req.query.page - 1) : 0;
    try {
        // chain populate method
        const _pyq = await PYQ.find({ subject_code: subject_code }).sort('-createdAt').skip(page * 10).limit(limit).populate({ path: 'pyq', populate: { path: 'author', select: 'name avatar registration_no isAdmin' } });
        return res.status(200).json(_pyq);
    } catch (error) {
       
        return res.status(500).send(errorModal("server", "server", "Server error try again!"));
    }
}

module.exports = { createPyqPost, getPyq };