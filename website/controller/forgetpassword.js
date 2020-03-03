var express=require('express');
var signupuser=require('../model/singup')
var router=express.Router();
var bcrypt=require('bcryptjs');
var validator=require('validator');
var jwt=require('jsonwebtoken');
var auth=require('../middleware/auth')
var nodemailer = require('nodemailer');



router.post('/',async (req,res)=>{
    
const {email}=req.body;
var user=await signupuser.forgetpass(email);
if(user==null || user==undefined){
  res.json(' user is not found')
}
else{
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
  auth: {
    user: 'uic.17mca8265@gmail.com',
    pass: 'bhupesh1996'
  }
}); 
var mailOptions = {
  from: 'uic.17mca8265@gmail.com',
  to: user.email,
  subject: 'password reset please use the link below to reset',
  text: 'http://localhost:8080/forgetpassword/resetpassword?userid='+ user._id,
};
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    res.json('email is not send!try again');
    console.log("error",error)
  } else {
    console.log("successful")
    res.json('email is send to you!change password');
 
}
});
}
})

router.post('/resetpassword',async (req,res)=>{
  // const { userid }=req.param ;
  const { password }=req.body ;
  console.log("id is:",req.body.password);
  // const{confirmpassword}=req.body ;
// const user=await signupuser.resetpassword(userid,password);
})

module.exports=router;