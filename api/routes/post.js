const router = require('express').Router();
const {addPost, getPost, getUserPost} = require('../controller/post');
const {verifyToken,validateIsAdmin} = require("../middleware/verificationsAndValidations");
const {validatePost} = require('../middleware/postValidator');
router.post('/addpost', verifyToken, validatePost, addPost);
router.get('/posts', getPost);
router.get('/userposts',verifyToken, getUserPost);

module.exports = router;