var cookie=require('cookie-parser');
// var Mongostor=require('connect-mongo');
var mongose=require('mongoose');
var express=require('express');
var session1=require('express-session');

var app=express()
require('dotenv')
mongose.set('useNewUrlParser', 'true');
mongose.set('useCreateIndex', 'true');
mongose.set('useFindAndModify', 'true');
mongose.connect("mongodb://127.0.0.1:27017/website").then(() => {
    console.log("");
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ");
    });

var db=mongose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',(req,res)=>{
    console.log(" db address:localhost:27017");
})
app.use(cookie());
app.use(session1({
    key:'session',
    secret:'topsecret',
    resave:false,
    // store:require('mongoose-session')(mongose),
    cookies:{
        secrue:true
    },
}))
module.exports=mongose
