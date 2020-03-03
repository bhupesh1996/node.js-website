var express=require('express')
var http=require('http')
var app=express()
port=8080;
http.createServer(app).listen(port,(req,res)=>{
    console.log("server is running in port",port )
});
module.exports=app