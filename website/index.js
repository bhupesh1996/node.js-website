var auth=require('./middleware/auth')
var app=require('./server')
var signup=require('./controller/signup');
var signout=require('./controller/signout')
var signin=require('./controller/signin')
var update=require('./controller/update')
var forgetpassword=require('./controller/forgetpassword')
var session=require('express-session')
var db=require('./db');
var bodyParser = require('body-parser');
var cookie=require('cookie-parser');
var Mongostor=require('connect-mongo');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('viewengin','ejs')
app.set('useNewUrlParser', 'true')
app.set('useUnifiedTopology', 'true')
app.use('/user/signout',signout);
app.use('/user/signup',signup);
app.use('/user/signin',signin);
app.use('/user/signin',update);
app.use('/forgetpassword',forgetpassword);
app.all('*',(req,res)=>{
    return res.json({status: 205,message: 'not found'});
})

var server=app.get('/',(req,res)=>{
req.end()
});
