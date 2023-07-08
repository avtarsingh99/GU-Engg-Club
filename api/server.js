require('dotenv').config();
require('./database/db');
const express = require('express');
const fileupload = require('express-fileupload');
const app = express();
const auth = require('./routes/auth');
const subject = require('./routes/subject');
const post = require('./routes/post');
const notes = require('./routes/notes');
const profile = require('./routes/profile');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))
app.use('/api/auth', auth);
app.use('/api/subject', subject);
app.use('/api/post', post);
app.use('/api/notes', notes);
app.use('/api/profile', profile);
// test api to check weather server is working or not
app.get('/api/test', (req, res)=>res.status(200).json("Server is working"));
app.listen(process.env.PORT, ()=>{
    console.log("Server is started at PORT: "+process.env.PORT);
});