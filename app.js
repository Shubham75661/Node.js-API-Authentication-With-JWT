const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config()
const app = express()

mongoose.connect(process.env.DB_CONNECT,()=>{
    console.log('connected to database');
})

app.use(express.json());

// Routes
const authroute = require('./routes/auth');
const postroutes = require('./routes/posts');

//Middleware

app.use('/api/user', authroute);
app.use('/api/posts', postroutes);

app.listen(3000,()=>console.log('server is up and running'))