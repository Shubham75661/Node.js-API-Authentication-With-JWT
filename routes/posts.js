const router = require('express').Router();
const verify = require('./verifytoken')

router.get('/', verify ,(req,res) =>{
    res.json({posts:{title: 'wonder world'}})
});

module.exports =router;