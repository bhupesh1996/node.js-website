var express=require('express');
var signupuser=require('../model/singup')
var router=express.Router();
var bcrypt=require('bcryptjs');
var validator=require('validator');
var jwt=require('jsonwebtoken');
var auth=require('../middleware/auth')

router.post('/profile',auth,(req,res)=>{
    try{   
        req.user.token=req.user.token.filter((token)=>{
            return token.token != req.token
        })
        res.send('logout successful')
        req.user.save()
    }
    catch(err){
        res.send('failed to logout')
    }

})
module.exports=router