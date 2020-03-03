var mongoose=require('mongoose');
require('../db');
var authy=require('authy')
var bcrypt=require('bcryptjs');
var validator=require('validator');
var jwt=require('jsonwebtoken');
mongoose.Promise=require('bluebird');
var schema= new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true,validate:value=>{
        if(!validator.isEmail(value)){
            throw new Error({error:'invalid email address'}) 
        }
    }},
    // mobile_no:{type:Number,unique:true,required:true},
    password:{type:String,required:true,minlength:5,hide:true}, 
    //  authtoken:[{token:{type:String,required:true}}],  
    mobile_no:{type:Number,required:true} 
});

// for hidding password in Api 

var hiddenpass=require('mongoose-hidden')({defaultHidden:{passsword:true,autoHideObject:false,autoHideJSON:false}})
schema.plugin(hiddenpass)

// hashing the password

schema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    
    next()
})

//generating token

schema.methods.generateauthToken=async function(){
    const user=this
    const token=jwt.sign({_id:user._id},"mynameisbhupesh",{
        expiresIn:"10d"
    })
    // user.authtoken=user.authtoken.concat({token})
   await user.save()
    return token
}

// login using auth ang email and password

schema.statics.findByCredentials = async (email,password)=>{
    const user=await signupuser.findOne({email})
    if(!user){
        throw new Error ({error:'Invalid '}) 
    }
    const ispassmatch=await bcrypt.compare(password,user.password) 
     if(!ispassmatch){
        throw new Error ({error:'incorrect password'})
    } 
    return user 
     }

     
      //update profile

schema.statics.updateProfile= (email,name,mobile_no,password)=>{
    const user= signupuser.findOneAndUpdate({email},{name,mobile_no,password},(req,res)=>{       
    user1=this 
    user1.password= bcrypt.hash(user1.password,8)        
    req.save();        
    })
 }

   //forgetpassword

schema.statics.forgetpass = async (email)=>{
    // console.log("hello:",email)
        var user= await signupuser.findOne({"email":email})
        return user
        console.log("useruser",user)
}

     //reset password

// schema.statics.resetpassword=async (userid,password)=>{
//     const user=signupuser.findByIdAndUpdate({userid},{password},async(req,res)=>{       
//         // user=this 
//         user.password=await bcrypt.hash(user.password,8)                
//         })
//      return user
// }
const signupuser=mongoose.model('signupuser',schema);
module.exports=signupuser;