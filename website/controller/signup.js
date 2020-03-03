var express=require('express');
var signupuser=require('../model/singup')
var router=express.Router();
var bcrypt=require('bcryptjs');
var validator=require('validator');
var jwt=require('jsonwebtoken');

// var insert=(req,res)=>{
//     var name1= req.body.name;
//     var email1= req.body.email;
//     var password1= req.body.password;
//     signupuser.findOne({email:req.body.email},(err,user)=>{

//          if( user==null || user.email != req.body.email){
//          res.json("sucessful");
            
       
//     signupuser.create({
//         name: name1,
//         email:email1,
//         password:password1,
//         authtoken:user.authtoken
//     },(err,result)=>{
//         if(err){res.json({message:'error'
//            })
//         }
//         else{res.json({message:'sucessful',
//         result:result   
//         })
//      } 
// })
// }

// else if(user.email == req.body.email){
//     res.end("user already exist")
// }
// else{
//     res.end("try")
// }
// })
// }

router.post('/',async (req,res)=>{
    try{
        const user=new signupuser(req.body)
        await user.save()
       
        res.status(201).send({user,token})
    }
    catch(error){
        res.status(400).send(error)
    }
})

   

module.exports=router;