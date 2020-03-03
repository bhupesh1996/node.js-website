//use session based authentication or web token based authentication


//  i used web token based authentication using {jsonwebtoken module}

var express=require('express');
var signupuser=require('../model/singup')
var jwt=require('jsonwebtoken');
var router=express.Router();
var auth= async function(req,res,next){
const token =req.header("Authorization").replace('Bearer ','')
const decode=jwt.verify(token,"mynameisbhupesh");
try{
    const user= await signupuser.findOne({_id: decode._id})
    if(!user){
        res.json("user not loged in" )
    }
    req.user=user
    req.token=token
    next();
 }catch(err){
res.status(401).send({error:'no auth token'})
 }}


module.exports=auth