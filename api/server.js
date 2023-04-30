require('dotenv').config();
require('./database/db');
const express = require('express');
const app = express();
const auth = require('./routes/auth');
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.use('/api/auth', auth);
// test api to check weather server is working or not
app.get('/api/test', (req, res)=>res.status(200).json("Server is working"));
app.listen(process.env.PORT, ()=>{
    console.log("Server is started at PORT: "+process.env.PORT);
});