const Post = require('../models/Post');
const User = require('../models/User');
const {mongoose} = require('mongoose');
const {errorModal} = require('../middleware/verificationsAndValidations');
const addPost = async (req, res)=>{
    const author = req.user.id;
    const {title, content, type, file_url} = req.body;
    const newPost = new Post({
        author,
        title,
        content,
        file_url,
        type
    });
    try {
        const mongooseSession = await mongoose.startSession();
        mongooseSession.startTransaction();
        const _post = await newPost.save({mongooseSession});
        const _user = await User.findById({_id:author});
        _user.posts.push(_post);
        await _user.save({mongooseSession});
        await mongooseSession.commitTransaction();
        return res.status(200).json(_post);
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorModal("server", "server", "Server error try again!"));
    }
};
const getPost = async (req, res)=>{
    const type = req.query.type;
    const limit = req.query.limit?req.query.limit:10;
    const page = req.query.page?req.query.page-1:0;
    if(type !== undefined && type !== 'normal' && type !== 'pyq' && type !== 'notes' && type !== 'issue' && type !== 'project')
    return res.status(401).send(errorModal("Invalid", "Invalid", "Invalid Type"));
    try {
        let posts = [];
        if(type)
            posts = await Post.find({type}).sort('-createdAt').skip(page*10).limit(limit).populate('author', 'name avatar registration_no isAdmin');
        else
            posts = await Post.find().sort('-createdAt').skip(page*10).limit(limit).populate('author', 'name avatar registration_no isAdmin');
        return res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorModal("server", "server", "Server error try again!"));
    }
};
const getUserPost = async (req, res)=>{
    const author = req.user.id;
    const type = req.query.type;
    const limit = req.query.limit?req.query.limit:10;
    const page = req.query.page?req.query.page-1:0;
    if(type !== undefined && type !== 'normal' && type !== 'pyq' && type !== 'notes' && type !== 'issue' && type !== 'project')
        return res.status(401).send(errorModal("Invalid", "Invalid", "Invalid Type"));
    try {
        let _user_post = {};
        if(type){
            if(type === 'normal' || type === 'issue')
            _user_post = await User.findById({_id:author}).populate('posts').sort('-createdAt').skip(page*10).limit(limit);
        }
        else
        _user_post = await Post.find({author}).sort('-createdAt').skip(page*10).limit(limit).populate('author', 'name avatar registration_no isAdmin');
        let {name, _id, registration_no, isAdmin, posts} = _user_post; 
        return res.status(200).json({name, _id, registration_no, isAdmin, posts});
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorModal("server", "server", "Server error try again!"));
    }

}
module.exports = {addPost, getPost, getUserPost, getUserPost};