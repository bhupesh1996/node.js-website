var express=require('express');
var signupuser=require('../model/singup');
var router=express.Router();
var bcrypt=require('bcryptjs');
var validator=require('validator');
var jwt=require('jsonwebtoken');
var auth=require('../middleware/auth');
router.post('/',auth,(req,res)=>
{
const {email,name,mobile_no}=req.body;
const user= signupuser.updateProfile(email,name,mobile_no);
res.json('profile has been updated')
});
module.exports=router;