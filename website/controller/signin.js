var express=require('express');
var signupuser=require('../model/singup')
var router=express.Router();
var bcrypt=require('bcryptjs');
var validator=require('validator');
var jwt=require('jsonwebtoken');
var auth=require('../middleware/auth')
router.post('/',async(req,res)=>
{
const {email,password}=req.body
const user=await signupuser.findByCredentials(email,password);
// console.log("login",user)
const authtoken=await user.generateauthToken();
res.send({user,authtoken})
});

router.get('/profile',auth,(req,res)=>{
   try{ 
      res.send(req.user)
    }
    catch(TokenExpiredError){
        res.status(401).send('token expired')
    }
    
    }

)
module.exports=router;